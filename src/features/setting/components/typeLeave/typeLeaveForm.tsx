import { type SubmitHandler, useForm } from "react-hook-form";
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";
import { TextInput } from "@mantine/core";
import {
  type AddTypeLeaveSettingInput,
  type UpdateTypeLeaveSettingInput,
} from "../../types";
import * as validators from "../../helpers/validators";
import { zodResolver } from "@hookform/resolvers/zod";

export type TypeFormProps =
  | {
      kind: "create";
      onSubmit: SubmitHandler<AddTypeLeaveSettingInput>;
    }
  | {
      kind: "edit";
      typeLeave: UpdateTypeLeaveSettingInput;
      onSubmit: SubmitHandler<UpdateTypeLeaveSettingInput>;
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
        : validators.updateTypeLeaveFormSetting,
    ),
    defaultValues: kind === "edit" ? props.typeLeave : undefined,
  });

  const logCurrentValues = () => {
    console.log("Current form values:", getValues());
  };

  return (
    <>
      <Card className="mx-auto w-7/12">
        <CardHeader className="bg-blueDark Ekachon_Bold pl-5 text-xl text-white">
          ตั้งค่าประเภทการลา
        </CardHeader>
        <CardBody>
          <h2 className="my-2">เพิ่มข้อมูล</h2>
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
