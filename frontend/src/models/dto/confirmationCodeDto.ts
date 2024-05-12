export interface ConfirmationCodeDto {
   code: number,
   email: string,
   confirmationType: 'EMAIL_CONFIRMATION' | 'PASSWORD_RESET' | 'EMAIL_ALTERATION';
}