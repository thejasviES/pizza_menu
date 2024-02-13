import { Link } from 'react-router-dom'

function Button({ children, disabled, to, type, onClick }) {
    const styles = {
        primary:
            'inline-block text-sm rounded-full bg-yellow-400  px-4 py-3 font-semibold uppercase  tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 disabled:cursor-not-allowed  px-3 py-2 md:px-3 md:py-3 ',

        small: 'inline-block text-sm rounded-full bg-yellow-400  font-semibold uppercase  tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 disabled:cursor-not-allowed px-3 py-2 md:px-3 md:py-3  text-xs',

        secondary:
            'inline-block text-sm rounded-full border-2 border-stone-300   font-semibold uppercase  tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 disabled:cursor-not-allowed px-3 py-2 md:px-3 md:py-3 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled: cursor-not-allowed hover:text-stone-800 ',

        round: 'inline-block text-sm rounded-full bg-yellow-400  px-4 py-3 font-semibold uppercase  tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 disabled:cursor-not-allowed  px-2.5 py-1 md:px-3.5 md:py-2',
    }
    if (to) {
        return (
            <Link to={to} className={styles[type] || styles.primary}>
                {children}
            </Link>
        )
    }
    if (onClick)
        return (
            <button
                onClick={onClick}
                disabled={disabled}
                className={styles[type] || styles.primary}
            >
                {children}
            </button>
        )
    return (
        <button disabled={disabled} className={styles[type] || styles.primary}>
            {children}
        </button>
    )
}

export default Button
