import {
    ButtonHTMLAttributes,
    DetailedHTMLProps,
    HTMLAttributes,
    InputHTMLAttributes,
    useEffect,
    useRef,
    useState,
} from "react";

type IButtonProps = DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

export const Button = (props: IButtonProps) => {
    const { children, ...rest } = props;

    return (
        <>
            <button
                {...rest}
                className="bg-beige h-14 uppercase w-80 rounded py-2 px-4 border border-blue text-blue active:shadow-lg active:border-2 hover:bg-burlywood transition ease-in-out duration-200"
            >
                {children}
            </button>
        </>
    );
};

type IInputProps = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    label?: string;
    containerProps?: DetailedHTMLProps<
        HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    >;
};

export const Input = (props: IInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { label, containerProps, ...rest } = props;

    const focus = () => inputRef.current?.focus();

    return (
        <>
            <div className="relative" {...containerProps}>
                <input
                    {...rest}
                    ref={inputRef}
                    className={`${props.className} bg-beige rounded py-3 px-5 w-72 md:w-96 border border-blue acive:border-2 transition duration-100 text-blue my-2 z-10 outline-none`}
                    placeholder={props.label}
                />
                <label
                    className="bg-beige px-1 select-none"
                    onClick={focus}
                >
                    {props.label}
                </label>
            </div>
            <style jsx>{`
                input:focus ~ label,
                input:not(:placeholder-shown) ~ label {
                    transform: translateY(-1.5rem) translateX(-0.6rem)
                        scale(0.8);
                    color: var(--blue);
                    z-index: 11;
                }

                label {
                    position: absolute;
                    top: 1.25rem;
                    left: 1rem;
                    transform: translateY(0) scale(1);
                    transition: all 0.1s ease-in-out;
                    color: rgba(0, 0, 0, 0.6);
                    cursor: text;
                }

                input::placeholder {
                    opacity: 0;
                }

                input:focus:invalid {
                    border: 1px solid crimson;
                }
            `}</style>
        </>
    );
};

type IDateInputProps = Omit<Omit<IInputProps, "value">, "onChange"> & {
    value: Date | null;
    onChange: (date: Date | null) => void;
};

export const DateInput = (props: IDateInputProps) => {
    const date = props.value;
    const { onChange } = props;
    const [dd, setDD] = useState<string>(date ? date.getDate().toString() : "");
    const [mm, setMM] = useState<string>(
        date ? date.getMonth().toString() : ""
    );
    const [yyyy, setYYYY] = useState<string>(
        date ? date.getFullYear().toString() : ""
    );
    const [invalid, setInvalid] = useState<boolean>(false);
    const dateRef = useRef<Date | null>(null);

    useEffect(() => {
        const newDate = new Date(`${yyyy}-${parseInt(mm) - 1}-${dd}`);
        if (
            dateRef.current &&
            dateRef.current.getTime() === newDate.getTime()
        ) {
            return;
        }

        if (newDate.toString() === "Invalid Date") {
            setInvalid(true);
            onChange(null);
            return;
        }

        setInvalid(false);
        dateRef.current = newDate;
        onChange(newDate);
    }, [dd, mm, onChange, yyyy]);

    return (
        <>
            <div className="grid grid-cols-3 w-60">
                <Input
                    value={dd}
                    onChange={(e) => setDD(e.target.value)}
                    style={{
                        border: invalid ? "1px solid crimson" : "",
                    }}
                    className="w-14 md:w-14"
                    label="DD"
                    required
                />
                <Input
                    value={mm}
                    onChange={(e) => setMM(e.target.value)}
                    style={{
                        border: invalid ? "1px solid crimson" : "",
                    }}
                    className="w-14 md:w-14"
                    label="MM"
                    required
                />
                <Input
                    value={yyyy}
                    onChange={(e) => setYYYY(e.target.value)}
                    style={{
                        border: invalid ? "1px solid crimson" : "",
                    }}
                    className="w-20 md:w-20"
                    pattern="\d{4}"
                    label="YYYY"
                    required
                />
            </div>
        </>
    );
};
