import './Button.scss'

const Button = ({children, className="", onClick, to, ...rest}) => {
    return (
    <button className={`buttonNajjar ${className}`} onClick={ onClick } {...rest}>
        {children}
    </button>
    )
}

export default Button;