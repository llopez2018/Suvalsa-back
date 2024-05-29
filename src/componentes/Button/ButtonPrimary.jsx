import React from 'react'

const ButtonPrimary = ({props}) => {
  return (
    <button onClick={props.callToAction}
        type="button"
        class="btn-primary">
        {props.label}
    </button>
  )
}
export default ButtonPrimary
