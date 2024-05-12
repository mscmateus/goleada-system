export interface PasswordResetDto {
   code: string;
   email: string;
   newPassword: string;
}