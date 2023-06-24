const TextArea = (props) => {
	return (
		<div className='mb-3'>
			<label htmlFor={props.name} className='form-label'>
				{props.label}
			</label>
			<textarea
				className='form-control'
				id={props.name}
				name={props.name}
				value={props.value}
				onChange={props.onChange}
				rows={props.rows}
				placeholder={props.placeholder}
			/>
			<div className={props.errorDiv}>{props.errorMessage}</div>
		</div>
	)
}

export default TextArea
