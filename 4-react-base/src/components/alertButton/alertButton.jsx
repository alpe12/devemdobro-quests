function alertNow(e){
    alert(`A label desse botão é: ${e.target.getAttribute('label')}`)
}

export default function alertButton(props){
    return (
        <button label={props.label} onClick={alertNow}>{props.children}</button>
    )
}

alertButton.defaultProps = {
    children: 'Clique aqui',
    label: 'não definida'
}