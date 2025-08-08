import z from "zod";

export const EnvSchema = z.object({
  PORT: z
    .string()
    .regex(/^\d+$/, "Port must be a numeric string.")
    .default("3000")
    .transform(Number),
});

export const ProcessEnv = EnvSchema.parse(process.env);
export type EnvSchemaType = z.infer<typeof EnvSchema>;
