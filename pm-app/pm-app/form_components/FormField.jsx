
function FormField(props) {
	return (
		<div className="input-group">
			<label>{props.label}</label>
			<input
				className={props.className} 
				value={props.value}
				type={props.type}
				name={props.name} 
				placeholder={props.placeholder}
				onChange={props.onChange}
				id={props.id}
			/>
		</div>
	);
}
export default FormField