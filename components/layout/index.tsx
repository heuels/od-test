import styles from './layout.module.css'

interface LayoutProps {
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  if (!children) return null
  return (
    <div className={styles.root}>
      <div className={styles.main}>{children}</div>
    </div>
  )
}

export default Layout
