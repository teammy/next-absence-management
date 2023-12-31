import { type SubmitHandler, useForm } from "react-hook-form";
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";
import { TextInput } from "@mantine/core";
import {
  type AddTypeLeaveSettingInput,
  type UpdateTypeLeaveSettingInput,
  type TypeLeaveDetails,
} from "../../types";
import * as validators from "../../helpers/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { use, useState } from "react";

export type TypeFormProps =
  | {
      kind: "create";
      onSubmit: SubmitHandler<AddTypeLeaveSettingInput>;
    }
  | {
      kind: "edit";
      typeLeave: TypeLeaveDetails;
      onSubmit: SubmitHandler<UpdateTypeLeaveSettingInput['data']>;
    };

const TypeLeaveForm = (props: TypeFormProps) => {
  const { kind, onSubmit } = props;
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<
    typeof onSubmit extends SubmitHandler<AddTypeLeaveSettingInput>
      ? AddTypeLeaveSettingInput
      : UpdateTypeLeaveSettingInput
  >({
    mode: "onBlur",
    resolver: zodResolver(
      kind === "create"
        ? validators.addTypeLeaveFormSetting
        : validators.updateTypeLeaveForm
    ),
    defaultValues: kind === "edit" ? props.typeLeave : undefined,
  });

  const titleValueModal = kind === "create" ? "เพิ่มข้อมูลประเภทการลา" : "แก้ไขข้อมูลประเภทการลา";


  return (
    <>
      <Card className="mx-auto w-7/12">
        <CardHeader className="bg-blueDark Ekachon_Bold pl-5 text-xl text-white">
          {titleValueModal}
        </CardHeader>
        <CardBody>
          <div className="flex w-full flex-wrap gap-4 md:flex-nowrap">
            <form
              className="flex w-full flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextInput
                type="text"
                label="ประเภทการลา"
                radius="sm"
                error={errors.leaveTypeDescription?.message}
                {...register("leaveTypeDescription", { required: true })}
              />
              <TextInput
                type="number"
                label="จำนวนวันลาต่อปี (วัน)"
                radius="sm"
                error={errors.maxAllowPerYear?.message}
                {...register("maxAllowPerYear", { valueAsNumber:true })}
              />
              <Button
                variant="shadow"
                type="submit"
                size="lg"
                radius="sm"
                isDisabled={!isValid}
              >
                บันทึก
              </Button>
            </form>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default TypeLeaveForm;
