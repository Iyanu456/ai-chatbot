
function Checkbox(props) {
	return (
		<div className="checkbox">
		    <input type="checkbox"></input>
		    <label>{props.label}<a href={props.href}><span>{props.linkLabel}</span></a></label>
		</div>
	);
}
export default Checkbox