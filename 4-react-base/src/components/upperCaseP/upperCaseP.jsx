export default function UpperCaseP(props){
    return (
        <p style={{color: props.color}}>{
            typeof props.children === 'string' ? props.children.toUpperCase() : props.children
        }</p>
    )
}

UpperCaseP.defaultProps = {
    color: 'black',
    children: 'texto'
}