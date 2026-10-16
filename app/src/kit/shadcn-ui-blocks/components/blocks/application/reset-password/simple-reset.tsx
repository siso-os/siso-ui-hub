"use client";

import * as React from 'react';

import { EyeIcon, EyeOffIcon, LockIcon } from 'lucide-react';
import { Button } from '../../../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '../../../ui/field';
import { Input } from '../../../ui/input';
import { Alert, AlertDescription } from '../../../ui/alert';

export default function SimpleReset() {
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitted(true);
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <Card className="mx-auto max-w-md">
        <CardHeader className="space-y-1">
          <div className="bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            <LockIcon className="text-primary h-6 w-6" />
          </div>
          <CardTitle className="text-center text-2xl">Reset Password</CardTitle>
          <CardDescription className="text-center">
            Create a new password for your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <Alert className="bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-300">
              <AlertDescription>
                Your password has been successfully reset. You can now{' '}
                <a href="#" className="font-medium underline">
                  sign in
                </a>{' '}
                with your new credentials.
              </AlertDescription>
            </Alert>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="password">New Password</FieldLabel>
                  <div className="relative">
                    <Input
                      id="password"
                      placeholder="••••••••"
                      type={isPasswordVisible ? 'text' : 'password'}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground absolute top-0 right-0 h-full px-3 py-2"
                      onClick={togglePasswordVisibility}
                    >
                      {isPasswordVisible ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        Toggle password visibility
                      </span>
                    </Button>
                  </div>
                  <FieldDescription>
                    Password must be at least 8 characters with uppercase,
                    lowercase, and number.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      placeholder="••••••••"
                      type={isConfirmPasswordVisible ? 'text' : 'password'}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground absolute top-0 right-0 h-full px-3 py-2"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {isConfirmPasswordVisible ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        Toggle confirm password visibility
                      </span>
                    </Button>
                  </div>
                </Field>
              </FieldGroup>
              <Button type="submit" className="w-full">
                Reset Password
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-muted-foreground text-sm">
            Remember your password?{' '}
            <a href="#" className="text-primary underline">
              Sign in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
