import { z } from 'zod'

const InstitutionSignUp = z.object({
  name: z.string({required_error: "Name is required", invalid_type_error: "Name must be a string", }).min(6).max(50),
  phone_number: z.string({required_error: "phone number is required"}).length(10),
  mail: z.string({required_error: "mail is required"}).email(),
  website: z.string({required_error: "website is required"}).url(),
  username: z.string({required_error: "username is required"}).min(6).max(12),
  password: z.string({required_error: "password is required"}).max(25, "Password too long - should be atmost 25 characteres").min(8, "Password too short - should be 8 chars minimum")
}).extend({ confirm_password: z.string(), })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password Must Match",
    path: ["confirm_password"],
  });

const LoginValidator = z.object({
    username: z.string({required_error: "username: is required"}).min(6).max(30),
    password: z.string({required_error: "password: is required"}),
});

export { InstitutionSignUp, LoginValidator };
