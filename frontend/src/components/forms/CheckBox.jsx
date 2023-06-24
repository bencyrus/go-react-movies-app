const CheckBox = (props) => {
	return (
		<div className='form-check'>
			<input
				className='form-check-input'
				type='checkbox'
				id={props.name}
				name={props.name}
				value={props.value}
				checked={props.checked}
				onChange={props.onChange}
			/>
			<label className='form-check-label' htmlFor={props.name}>
				{props.label}
			</label>
		</div>
	)
}

export default CheckBox
