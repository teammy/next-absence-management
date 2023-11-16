import React , { useState } from 'react'
import { api } from '~/utils/api';
import { Listbox,ListboxSection,ListboxItem,ScrollShadow } from '@nextui-org/react';

type Props = {}

export default function SubEmployeeList() {
  const [selectedEmployee, setSelectedEmployee] = useState<number>(0);
  const utils = api.useUtils();
  const { data: listEmployee } = api.employee.listEmployeeName.useQuery();
  if (!listEmployee) return <div>No Data</div>;
  // const { data: profileByid } = api.employee.byId.useQuery(selectedEmployee);

  const numofEmployee = listEmployee?.length;

  return (
    <>
    
    <div>SubEmployeeList {numofEmployee}</div>
    <div>
      <ScrollShadow className="h-64 w-64">
      <Listbox
        aria-label="Select a country"
        items={listEmployee}
        onChange={(value) => setSelectedEmployee(value)}
      >
        <ListboxSection title="Employees">
          {listEmployee.map((item) => (
            <ListboxItem key={item.user_id} value={item.user_id}>
              {item.person_firstname} {item.person_lastname}
            </ListboxItem>
          ))}
        </ListboxSection>
      </Listbox>
      </ScrollShadow>
    </div>
    </>
  )
}