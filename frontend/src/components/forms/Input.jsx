import { forwardRef } from 'react'

const Input = forwardRef((props, ref) => {
	return (
		<div className='mb-3'>
			<label htmlFor={props.name} className='form-label'>
				{props.label}
			</label>
			<input
				ref={ref}
				type={props.type}
				className={props.className}
				id={props.name}
				name={props.name}
				value={props.value}
				onChange={props.onChange}
				placeholder={props.placeholder}
				autoComplete={props.autoComplete}
			/>
			<div className={props.errorDiv}>{props.errorMessage}</div>
		</div>
	)
})

export default Input
