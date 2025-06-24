import { variables } from '$lib/utils/constants.ts';
import type { Organization } from '$lib/interfaces/v2/organization';
import type { Effector, EffectorType } from '$lib/interfaces/v2/effector';
import type { Facility } from '$lib/interfaces/v2/facility.ts';
import type { Entry } from '$lib/store/directoryStoreInterface.ts';
import type { Commune, DepartmentOfFrance } from '$lib/interfaces/v2/facility.ts';

export const getEffectorTypes = async () => {
  const response = await fetch('/api/v2/effector-types')
  const data = (await response.json()) as Array<EffectorType>
  return data
}

export const getOrganizations = async () => {
  const response = await fetch('/api/v2/organizations')
  const data = (await response.json()) as Array<Organization>
  return data
}

export const getFacilities = async () => {
  const response = await fetch('/api/v2/facilities')
  const data = (await response.json()) as Array<Facility>
  return data
}

export const getFacility = async (uid: string) => {
  const response = await fetch(`/api/v2/facilities/${uid}`)
  const data = (await response.json()) as Facility
  return data
}

export const getEntry = async (uid: string) => {
  const response = await fetch(`${variables.BASE_URI}/api/v1/entries/${uid}`)
  const data = (await response.json()) as Entry
  return data
}

export const getDepartments = async () => {
  const response = await fetch('/api/v2/departments')
  const data = (await response.json()) as Array<DepartmentOfFrance>
  return data
}

export const getCommunesByDpt = async (code: string): Promise<Commune[]> => {
  const response = await fetch(
    `/api/v2/communes?department=${code}`,
  )
  const data = (await response.json()) as Commune[]
  return data
}

export const getEffector = async (effector_type: string, facility: string): Promise<Effector[]> => {
  const response = await fetch(
    `/api/v2/effectors?effector_type=${effector_type}&facility=${facility}`,
  )
  const data = (await response.json()) as Effector[]
  return data
}