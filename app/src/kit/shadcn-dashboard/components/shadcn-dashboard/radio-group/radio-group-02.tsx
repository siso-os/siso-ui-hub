"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/components/ui/toast";
import { Button } from "../../../../shadcn/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../../../../shadcn/ui/field";
import { RadioGroup, RadioGroupItem } from "../../../../shadcn/ui/radio-group";

const FormSchema = z.object({
  type: z.enum(["all", "mentions", "none"]),
});

const FormRadioCode = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.add({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="mt-4 max-w-xs w-full">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          control={form.control}
          name="type"
          render={({ field, fieldState }) => (
            <FieldGroup className="space-y-3">
              <FieldLabel>Notify me about...</FieldLabel>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-1"
              >
                <Field
                  orientation="horizontal"
                  className="flex items-center space-x-3 space-y-0"
                >
                  <RadioGroupItem
                    value="all"
                    id="all"
                    className={"cursor-pointer"}
                  />
                  <FieldLabel htmlFor="all" className="font-normal">
                    All new messages
                  </FieldLabel>
                </Field>

                <Field
                  orientation="horizontal"
                  className="flex items-center space-x-3 space-y-0"
                >
                  <RadioGroupItem
                    value="mentions"
                    id="mentions"
                    className={"cursor-pointer"}
                  />
                  <FieldLabel htmlFor="mentions" className="font-normal">
                    Direct messages and mentions
                  </FieldLabel>
                </Field>

                <Field
                  orientation="horizontal"
                  className="flex items-center space-x-3 space-y-0"
                >
                  <RadioGroupItem
                    value="none"
                    id="none"
                    className={"cursor-pointer"}
                  />
                  <FieldLabel htmlFor="none" className="font-normal">
                    Nothing
                  </FieldLabel>
                </Field>
              </RadioGroup>
              <FieldError errors={[fieldState.error]} />
            </FieldGroup>
          )}
        />
        <Button type="submit" className="rounded-full">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default FormRadioCode;
