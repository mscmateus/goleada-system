export const URLS_PUBLICAS = [
   "/usuario/cadastrar",
   "/login",
   "/refresh/",
   "/usuario/email/",
   "/usuario/confirmacao-email/enviar-codigo",
   "/usuario/redefinicao-senha/enviar-codigo",
   "/usuario/redefinicao-senha/alterar-senha",
   "/usuario/validar-codigo",
   "/cadastro-entidade"
]

export const isUrlPublica = (url: string): boolean => {
   let contem = false;
   for (let urlPublica of URLS_PUBLICAS) {
      if (url.includes(urlPublica)) {
         contem = true;
         break
      }
   }
   return contem;
}
