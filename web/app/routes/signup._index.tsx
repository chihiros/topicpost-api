import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Text from "../components/atoms/InputTest";
import Label from "../components/atoms/Label";
import { userApi } from "../services/openapi";
import { UserRequest } from "../services/openapi/generated";
import { SupabaseSignUp } from "../services/supabase/Supabase";

const validateForm = (email: string, emailConfirm: string, password: string) => {
  const message: string[] = [];

  if (email !== emailConfirm) {
    message.push("メールアドレスが一致しません");
  }

  if (password.length < 8 || password.length > 64) {
    message.push("パスワードは8文字以上64文字以下で入力してください");
  }

  // if (/^[0-9]*$/.test(password) || /^[a-zA-Z]*$/.test(password)) {
  //   message.push("パスワードは半角英数と記号が利用できます");
  // }

  if (message.length > 0) {
    return message;
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const form = Object.fromEntries(formData);

  const _email = form.email.toString();
  const _emailConfirm = form.emailConfirm.toString();
  const _password = form.password.toString();

  const message = validateForm(_email, _emailConfirm, _password);
  if (message) {
    return json({ error: message });
  }

  const { data, error } = await SupabaseSignUp(_email, _password);
  if (error) {
    console.log(error.status, error.message);
    if (error.message === "User already registered") {
      return json({ error: ["このメールアドレスは既に登録されています"] });
    }

    return json({ error: ["アカウント登録に失敗しました"] });
  }

  // const res = await userApi.usersPost({
  //   uid: data?.user?.id ?? "",
  // } as UserRequest);
  await userApi.usersPost({
    uid: data?.user?.id ?? "",
  } as UserRequest);

  // return redirect(request.headers.get("Referer") ?? "/");
  return redirect("/signup/complete");
}

export default function Login() {
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (actionData?.error) {
      actionData.error.map((e: string) => toast.error(e));
    }
  }, [actionData]);

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex mb-5 text-3xl">新規アカウントの登録</div>
      <Form method="post">
        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className="col-span-12 sm:col-span-6">
            <Label htmlFor="email" required>
              メールアドレス
            </Label>
            <Text
              id="email"
              type="email"
              name="email"
              className="bg-gray-50"
              required={true}
              defaultValue={`example@example.com`}
            />
          </div>
          <div className="col-span-12 sm:col-span-6">
            <Label htmlFor="emailConfirm" required>
              メールアドレス(確認用)
            </Label>
            <Text
              id="emailConfirm"
              type="email"
              name="emailConfirm"
              className="bg-gray-50"
              required={true}
              defaultValue={`example@example.com`}
            />
          </div>
        </div>
        <div className="mb-4">
          <Label htmlFor="password" required>
            パスワード
          </Label>
          <Text
            id="password"
            type="password"
            name="password"
            className="bg-gray-50"
            placeholder=""
            required={true}
            defaultValue={`password`}
          />
          <div className="text-gray-500 text-sm mt-2">パスワードは8文字以上64文字以下で入力してください<br />半角英数と記号が利用できます</div>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="w-1/2 py-2.5 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >送信</button>
        </div>
      </Form>
    </div>
  );
}