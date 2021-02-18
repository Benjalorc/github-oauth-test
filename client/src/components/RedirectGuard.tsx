import React, { useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { useSelector } from "redux/store/index";

const RedirectGuard = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { redirect } = useSelector((state) => state.redirect);

  useEffect(()=>{

    if(redirect.path){

        if(redirect.message){
          enqueueSnackbar(redirect.message, {
            variant: (redirect.success ? 'success' : 'warning')
          });
        }
    }

  }, [redirect, enqueueSnackbar])

  if(redirect.path){

    return (
      <Redirect to={redirect.path} />
    )
  }

  return null;
}

export default RedirectGuard;