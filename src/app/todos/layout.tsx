"use client";
import { useState } from 'react';
import "./layout.css"
import Icon from '@mdi/react';
import { mdiLogout } from '@mdi/js';
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2';

const Fab = (props: any) => {
  const [showPopup, setShowPopup] = useState(false);
  const { LogoutHandle } = props;
  const handleFabClick = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="fab-container">

      {showPopup && (
        <div className="popup">

          <button className="more-button" onClick={LogoutHandle}><Icon path={mdiLogout} size={1} /></button>
        </div>

      )}
      <button className="fab" onClick={handleFabClick}>
        {showPopup ? '−' : '+'}
      </button>

    </div>
  );
};

const ContentLayout = (props: any) => {

  const { children } = props;
  const router = useRouter();

  const LogoutHandle = () => {
    localStorage.removeItem('token');
    router.push("/login");
  }

  return (
    <div>
      <div className='flex'>
        {children}
      </div>
      <Fab
        LogoutHandle={LogoutHandle}
      />
    </div>
  );
};

export default ContentLayout;