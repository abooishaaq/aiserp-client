import { FormEvent, useEffect, useRef, useState } from "react";
import {
  ConfirmationResult,
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  User,
} from "firebase/auth";
import Head from "next/head";
import firebase from "../firebase";
import { Input, Button } from "../components/neumorphic";
import { fetcher, post } from "../lib/fetch";
import { phone } from "phone";
import { useError, useInfo } from "../lib/message";
import { useRouter } from "next/router";
import { useAppDispatch } from "../lib/redux/hooks";
import { authSlice } from "../lib/redux/reducers/auth";

const OTP = () => {
  const auth = getAuth(firebase);
  const containerRef = useRef<HTMLDivElement>(null);
  const [widgetId, setWidgetId] = useState<number>(-1);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otpValue, setOTPValue] = useState<string>("");
  const [otpResult, setOtpResult] = useState<ConfirmationResult>();
  const [verifier, setVerifier] = useState<RecaptchaVerifier>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { setError } = useError();
  const { setInfo } = useInfo();

  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(
      containerRef.current!,
      {
        size: "invisible",
        callback: (response: string) => {
          console.log(response);
        },
      },
      auth
    );
    setVerifier(recaptchaVerifier);
  }, [auth, widgetId]);

  const afterLogin = async (token: string, user: User) => {
    const res = await post("/api/login", {
      token,
    });

    if (!res.ok) {
      res.json().then(({ error }) => {
        setError(error);
      });
      return;
    }

    const { token: jwtToken } = await res.json();

    localStorage.setItem("token", jwtToken);

    fetch("/api/me", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          if (!data.user) return;
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch(
            authSlice.actions.login({
              user: { ...data.user, pic: user.photoURL },
            })
          );
          setInfo("Logged In");
          const type = data.user.type;
          if (type === "ADMIN" || type === "SU") {
            router.push("/admin");
          } else if (type === "STUDENT") {
            router.push("/student");
          } else if (type === "TEACHER") {
            router.push("/teacher");
          }
        });
      }
    });
  };

  const sendOTP = async (e: FormEvent) => {
    e.preventDefault();
    const { isValid, phoneNumber: p } = phone(phoneNumber, {
      country: "IN",
    });
    if (!isValid) {
      setError("Invalid phone number");
      return;
    }

    const data = await fetcher("/api/phone?phone=" + encodeURIComponent(p));

    if (data.no) {
      return;
    }

    if (verifier) {
      try {
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          p,
          verifier
        );

        setOtpResult(confirmationResult);
      } catch (err) {
        setError((err as { message: string }).message);
      }
    } else {
      setError("Developer sends his apologies as something went wrong!");
    }
  };

  const confirmOTP = async (e: FormEvent) => {
    e.preventDefault();
    if (otpResult) {
      try {
        const result = await otpResult.confirm(otpValue);
        result.user.getIdToken().then((token) => {
          afterLogin(token, result.user);
        });
      } catch (err) {
        setError((err as { message: string }).message);
        router.push("/login");
      }
    }
  };

  return (
    <>
      <Head>
        <title>OTP Login</title>
      </Head>
      <div>
        {otpResult ? (
          <form className="otp-input" onSubmit={confirmOTP}>
            <Input
              value={otpValue}
              onChange={(e) => setOTPValue(e.target.value)}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="\d{6}"
              required
            />
            <Button type="submit">verify</Button>
          </form>
        ) : (
          <form className="tel-input" onSubmit={sendOTP}>
            <Input
              type="tel"
              placeholder="+91 #########"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Button type="submit">Send OTP</Button>
          </form>
        )}
        <div ref={containerRef} id="recaptcha-container" />
      </div>
      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          padding-bottom: 100px;
        }

        .tel-input {
          width: 100%;
          max-width: 480px;
          margin: 12px auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
};

export default OTP;
