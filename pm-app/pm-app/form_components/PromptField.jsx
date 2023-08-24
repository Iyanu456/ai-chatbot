
function PromptField(props) {
	return (
		<div className="input-group" style={{width: "100%", background: "transparent"}}>
			<label>{props.label}</label>
			<input
				className={props.className} 
				value={props.value}
				type={props.type}
				name={props.name} 
				placeholder={props.placeholder}
				onChange={props.onChange}
				id={props.id}
				style = {{
					outline: "none",
					border: "none",
					width: "99%",
					borderRadius: "30px",
					padding: "1em 1.8em",
					backgroundColor: "rgb(65, 65, 65)",
					color: "white",
					wordSpacing: "2px"
				}}
			/>
		</div>
	);
}
export default PromptField