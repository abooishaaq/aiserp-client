import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from "react";

interface IColorProps {
  color?: string;
}

export const Button = (
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
    IColorProps
) => {
  const { color, ...rest } = props;

  let bg = "";
  let boxShadow = "";
  let insetBoxShadow = "";

  switch (color) {
    case "blue":
      boxShadow = "8px 8px 20px #032e34, -8px -8px 20px #033e46;";
      insetBoxShadow =
        "inset 5px 5px 5px #033339, inset -5px -5px 5px #033941;";
      bg = "var(--blue)";
      break;
    case "burlywood":
      boxShadow = "8px 8px 20px  #cabeab, -8px -8px 20px #fcecd5;";
      insetBoxShadow =
        "inset 5px 5px 5px  #cabeab, inset -5px -5px 5px #fcecd5;";
      bg = "var(--burlywood)";
      break;
    default:
      boxShadow = "6px 6px 12px #e0d5c4,-6px -6px 12px #f8ebd8";
      insetBoxShadow =
        "inset 5px 5px 5px #e0d5c4, inset -5px -5px 5px #f8ebd8;";
      bg = "var(--beige)";
  }

  return (
    <>
      <button {...rest}></button>
      <style jsx>{`
        button {
          width: 100%;
          max-width: 360px;
          height: 50px;
          margin: 12px auto;
          border: none;
          border-radius: 8px;
          background: ${bg};
          box-shadow: ${boxShadow};
          cursor: pointer;
        }

        @media (max-width: 480px) {
          button {
            max-width: 280px;
          }
        }

        button:active {
          box-shadow: ${insetBoxShadow};
        }

        button:disabled {
          opacity: 0.5;
          box-shadow: none;
        }
      `}</style>
    </>
  );
};

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <>
      <input type="text" {...props} />
      <style jsx>{`
        input {
          height: 50px;
          width: 100%;
          margin: 12px 0;
          padding: 0 12px;
          border: none;
          outline: none;
          border-radius: 8px;
          background: var(--beige);
          box-shadow: inset 6px 6px 3px #e0d5c4, inset -6px -6px 3px #f8ebd8;
          font-size: 1rem;
        }
      `}</style>
    </>
  );
};
