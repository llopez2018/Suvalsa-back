import React from 'react'

const ButtonSecondary = ({ props }) => {
  return (
    <button onClick={props.callToAction}
        type="button"
        class="btn-secondary">
        {props.label}
    </button>
  )
}

export default ButtonSecondary
