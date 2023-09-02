import React from 'react';
import Lottie from 'react-lottie';

const LottieMessageScreen: React.FC<{
  animationData: any;
  message: string;
  extra?: string;
}> = (props) => {
  const { animationData, message, extra } = props;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="w-full h-full flex flex-col justify-center flex-1 rounded-md">
      <Lottie options={defaultOptions} height={300} width={300} />
      <p className="text-center -top-2 relative font-medium">{message}</p>
      {extra && <p className="text-center text-xs">{extra}</p>}
    </div>
  );
};

export default LottieMessageScreen;
