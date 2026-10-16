"use client";

import * as React from "react";
import { cn } from "@/arc-shims/kit-utils";

import { Button } from "../../../shadcn/ui/button";
import { Field, FieldGroup, FieldLabel } from "../../../shadcn/ui/field";
import { Input } from "../../../shadcn/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../shadcn/ui/select";
import { Textarea } from "../../../shadcn/ui/textarea";

type CustomerRecord = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  status: "active" | "vip" | "at-risk";
  notes: string;
};

const defaultCustomer: CustomerRecord = {
  firstName: "Theo",
  lastName: "Hammond",
  email: "theo.hammond@caldwell.app",
  phone: "+1 (206) 555-0198",
  company: "Caldwell",
  status: "active",
  notes: "Prefers email. Ships to the Capitol Hill studio.",
};

interface CustomerDetails1Props {
  className?: string;
}

const CustomerDetails1 = ({ className }: CustomerDetails1Props) => {
  const [customer, setCustomer] =
    React.useState<CustomerRecord>(defaultCustomer);
  const [saved, setSaved] = React.useState(false);

  const update =
    (key: keyof CustomerRecord) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSaved(false);
      setCustomer((current) => ({ ...current, [key]: event.target.value }));
    };

  return (
    <section className={cn("w-full bg-background", className)}>
      <form
        className="mx-auto flex w-full max-w-2xl flex-col gap-8 p-6"
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(true);
        }}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-muted-foreground">Customer CUS-1742</p>
            <h1 className="text-2xl font-semibold tracking-tight">
              Edit customer
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setCustomer(defaultCustomer);
                setSaved(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </div>

        <FieldGroup className="grid gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="customer-first-name">First name</FieldLabel>
            <Input
              id="customer-first-name"
              value={customer.firstName}
              onChange={update("firstName")}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="customer-last-name">Last name</FieldLabel>
            <Input
              id="customer-last-name"
              value={customer.lastName}
              onChange={update("lastName")}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="customer-email">Email</FieldLabel>
            <Input
              id="customer-email"
              type="email"
              value={customer.email}
              onChange={update("email")}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="customer-phone">Phone</FieldLabel>
            <Input
              id="customer-phone"
              type="tel"
              value={customer.phone}
              onChange={update("phone")}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="customer-company">Company</FieldLabel>
            <Input
              id="customer-company"
              value={customer.company}
              onChange={update("company")}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="customer-status">Status</FieldLabel>
            <Select
              value={customer.status}
              onValueChange={(value) => {
                setSaved(false);
                setCustomer((current) => ({
                  ...current,
                  status: value as CustomerRecord["status"],
                }));
              }}
            >
              <SelectTrigger id="customer-status" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
                <SelectItem value="at-risk">At risk</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field className="sm:col-span-2">
            <FieldLabel htmlFor="customer-notes">Notes</FieldLabel>
            <Textarea
              id="customer-notes"
              value={customer.notes}
              onChange={update("notes")}
              rows={4}
            />
          </Field>
        </FieldGroup>

        {saved ? (
          <p className="text-sm text-muted-foreground">
            Customer record saved.
          </p>
        ) : null}
      </form>
    </section>
  );
};

export { CustomerDetails1 };
