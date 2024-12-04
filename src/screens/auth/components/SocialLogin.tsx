/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleAPI } from "@/apis/handleAPI";
import { auth } from "@/firebase/firebaseConfig";
import { addAuth } from "@/redux/reducers/authReducer";
import { Button } from "antd";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

interface SocialLoginProps {
  text: string;
}

const SocialLogin: React.FC<SocialLoginProps> = ({ text }) => {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLoginWithGoogle = async () => {


    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      if (result) {
        const user = result.user;

        if (user) {
          const data = {
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          };

          const api = `/auth/google-login`;

          try {
            const res: any = await handleAPI(api, data, 'post');
            toast.success(res.message, {
              position: "top-right",
            })
            dispatch(addAuth(res.data));
          } catch (error: any) {
            console.log(error);
            toast.error(error.message, {
              position: "top-right",
            })
          } finally {
            setIsLoading(false);
          }
        }
      } else {
        toast.error('Can not login with google', {
          position: "top-right",
        })
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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