import React from "react";

export const Alert = (props) => {
  if (!props.alert) {
    return null;
  }
  let type = props.alert.type==="success"
  
return (
 <div className={`alert alert-${props.alert.type} d-flex justify-content-between`} role="alert">
<div>

{
type?<i className="fa-solid fa-circle-check mx-3"></i>:<i className="fa-solid fa-circle-exclamation mx-3"></i>
}

{props.alert.msg}
</div>
</div>
  )
};
