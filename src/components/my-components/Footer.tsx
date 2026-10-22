import Link from 'next/link'
import { LogoTicketDev } from './LogoTicketDev'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t border-border/40 bg-card/20 py-8 px-4 md:px-10 mt-auto flex flex-col md:flex-row">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-semibold text-foreground flex gap-2">
            <LogoTicketDev /> <span>•</span> Todos os direitos reservados.
          </div>
          <div className="text-xs text-muted-foreground">
            © {currentYear} Feito por <Link href="https://github.com/jlucassaldanha" className='text-cyan'>João Lucas</Link>.
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center md:items-end gap-2 max-w-md">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Este produto utiliza a API do <span className="text-foreground font-medium">TMDB</span>, mas não é endossado ou certificado pelo <Link href="https://www.themoviedb.org/" target="_blank" className="text-cyan">TMDB</Link>.
        </p>
      </div>
    </footer>
  )
}