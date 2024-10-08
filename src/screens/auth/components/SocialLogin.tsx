import { Button } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface SocialLoginProps {
  text: string;
}

const SocialLogin: React.FC<SocialLoginProps> = ({ text }) => {

  const [isLoading, setIsLoading] = useState(false);

  const handleLoginWithGoogle = () => {
    setIsLoading(true);
    
  };

  return (
    <Button
      loading={isLoading}
      onClick={handleLoginWithGoogle}
      style={{
        width: "100%",
      }}
      size="large"
      icon={
        <img
          width={24}
          height={24}
          src="https://img.icons8.com/color/48/google-logo.png"
          alt="google-logo"
        />
      }
    >
      {text}
    </Button>
  );
};

export default SocialLogin;
