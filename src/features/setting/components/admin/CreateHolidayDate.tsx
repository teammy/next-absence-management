import React from 'react'
import { api } from '~/utils/api'
import { type AddSettingHolidayInput } from '../../types'
import SettingHolidayDateForm from './SettingHolidayDateForm'
import { useRouter } from 'next/router'
import { useAppStore } from '~/features/store'



const CreateHolidayDate = () => {
  const setUiToast = useAppStore((state) => state.setUiToast)
  const router = useRouter()
  const utils = api.useContext()
  const list = utils.admin.settingHoliday.listHoliday
  const { mutate: AddSettingHolidayInput } = api.admin.settingHoliday.addHoliday.useMutation({
    async onMutate(input) {
      await list.cancel()

      const prevData = list.getData()
      list.setData(undefined, (old) => {
        if (!old) return old
       
      });

      return { prevData }
    },
    onError(_err, _data, ctx) {
      list.setData(undefined, ctx?.prevData)
    },
    onSettled() {
      list.invalidate()
    }
  });
  const CreateHolidayDate = (holidayDate: AddSettingHolidayInput) => {
    AddSettingHolidayInput(holidayDate)
    console.log(holidayDate)
    // console.log(holiday)
    setUiToast({
      type: 'Success',
      message: 'The holiday has been already created.',
    })
    router.push('/admin/setting/holidayDate')
  }

  return <SettingHolidayDateForm kind="create" onSubmit={CreateHolidayDate}></SettingHolidayDateForm>;
};

export default CreateHolidayDate