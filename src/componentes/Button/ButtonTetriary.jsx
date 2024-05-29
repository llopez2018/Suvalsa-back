import React from 'react'

const buttonTertiary = ({props}) => {
  return (
    <div>
        <button onClick={props.callToAction}
            type="button"
            class="btn-tertiary">
            {props.label}
        </button>
    </div>
  )
}

export default buttonTertiary
