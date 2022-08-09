import Image from "next/image";

interface ILogoProps {
  width?: number;
  height?: number;
}

const Logo = (props: ILogoProps) => (
  <Image
    src="/logo.svg"
    alt="logo"
    width={props.width || 32}
    height={props.height || 32}
  />
);

export default Logo;
