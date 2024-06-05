import type { AxiosRequestConfig } from 'axios';

import petStoreService from '../services/pet-store';
/**
 * uploads an image
 */
export function postPetUploadImageByPetId(
  pathParameters: PetStore.UploadFile.PathParameters,
  formDataParameters: FormData,
  config?: AxiosRequestConfig,
) {
  return petStoreService.request<PetStore.ApiResponse>({
    url: `/pet/${pathParameters.petId}/uploadImage`,
    method: 'post',
    data: formDataParameters,
    ...config,
  });
}
/**
 * Add a new pet to the store
 */
export function postPet(bodyParameters: PetStore.AddPet.BodyParameters['body'], config?: AxiosRequestConfig) {
  return petStoreService.request<void>({
    url: '/pet',
    method: 'post',
    data: bodyParameters,
    ...config,
  });
}
/**
 * Update an existing pet
 */
export function putPet(bodyParameters: PetStore.UpdatePet.BodyParameters['body'], config?: AxiosRequestConfig) {
  return petStoreService.request<void>({
    url: '/pet',
    method: 'put',
    data: bodyParameters,
    ...config,
  });
}
/**
 * Finds Pets by status
 *
 * @description Multiple status values can be provided with comma separated strings
 */
export function getPetFindByStatus(
  queryParameters: PetStore.FindPetsByStatus.QueryParameters,
  config?: AxiosRequestConfig,
) {
  return petStoreService.request<PetStore.Pet[]>({
    url: '/pet/findByStatus',
    method: 'get',
    params: queryParameters,
    ...config,
  });
}
/**
 * Finds Pets by tags
 *
 * @description Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
 *
 * @deprecated
 */
export function getPetFindByTags(
  queryParameters: PetStore.FindPetsByTags.QueryParameters,
  config?: AxiosRequestConfig,
) {
  return petStoreService.request<PetStore.Pet[]>({
    url: '/pet/findByTags',
    method: 'get',
    params: queryParameters,
    ...config,
  });
}
/**
 * Find pet by ID
 *
 * @description Returns a single pet
 */
export function getPetByPetId(pathParameters: PetStore.GetPetById.PathParameters, config?: AxiosRequestConfig) {
  return petStoreService.request<PetStore.Pet>({
    url: `/pet/${pathParameters.petId}`,
    method: 'get',
    ...config,
  });
}
/**
 * Updates a pet in the store with form data
 */
export function postPetByPetId(
  pathParameters: PetStore.UpdatePetWithForm.PathParameters,
  formDataParameters: FormData,
  config?: AxiosRequestConfig,
) {
  return petStoreService.request<void>({
    url: `/pet/${pathParameters.petId}`,
    method: 'post',
    data: formDataParameters,
    ...config,
  });
}
/**
 * Deletes a pet
 */
export function deletePetByPetId(pathParameters: PetStore.DeletePet.PathParameters, config?: AxiosRequestConfig) {
  return petStoreService.request<void>({
    url: `/pet/${pathParameters.petId}`,
    method: 'delete',
    ...config,
  });
}
/**
 * Returns pet inventories by status
 *
 * @description Returns a map of status codes to quantities
 */
export function getStoreInventory(config?: AxiosRequestConfig) {
  return petStoreService.request<Record<string, any>>({
    url: '/store/inventory',
    method: 'get',
    ...config,
  });
}
/**
 * Place an order for a pet
 */
export function postStoreOrder(
  bodyParameters: PetStore.PlaceOrder.BodyParameters['body'],
  config?: AxiosRequestConfig,
) {
  return petStoreService.request<PetStore.Order>({
    url: '/store/order',
    method: 'post',
    data: bodyParameters,
    ...config,
  });
}
/**
 * Find purchase order by ID
 *
 * @description For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions
 */
export function getStoreOrderByOrderId(
  pathParameters: PetStore.GetOrderById.PathParameters,
  config?: AxiosRequestConfig,
) {
  return petStoreService.request<PetStore.Order>({
    url: `/store/order/${pathParameters.orderId}`,
    method: 'get',
    ...config,
  });
}
/**
 * Delete purchase order by ID
 *
 * @description For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
 */
export function deleteStoreOrderByOrderId(
  pathParameters: PetStore.DeleteOrder.PathParameters,
  config?: AxiosRequestConfig,
) {
  return petStoreService.request<void>({
    url: `/store/order/${pathParameters.orderId}`,
    method: 'delete',
    ...config,
  });
}
/**
 * Creates list of users with given input array
 */
export function postUserCreateWithList(
  bodyParameters: PetStore.CreateUsersWithListInput.BodyParameters['body'],
  config?: AxiosRequestConfig,
) {
  return petStoreService.request<void>({
    url: '/user/createWithList',
    method: 'post',
    data: bodyParameters,
    ...config,
  });
}
/**
 * Get user by user name
 */
export function getUserByUsername(pathParameters: PetStore.GetUserByName.PathParameters, config?: AxiosRequestConfig) {
  return petStoreService.request<PetStore.User>({
    url: `/user/${pathParameters.username}`,
    method: 'get',
    ...config,
  });
}
/**
 * Updated user
 *
 * @description This can only be done by the logged in user.
 */
export function putUserByUsername(
  pathParameters: PetStore.UpdateUser.PathParameters,
  bodyParameters: PetStore.UpdateUser.BodyParameters['body'],
  config?: AxiosRequestConfig,
) {
  return petStoreService.request<void>({
    url: `/user/${pathParameters.username}`,
    method: 'put',
    data: bodyParameters,
    ...config,
  });
}
/**
 * Delete user
 *
 * @description This can only be done by the logged in user.
 */
export function deleteUserByUsername(pathParameters: PetStore.DeleteUser.PathParameters, config?: AxiosRequestConfig) {
  return petStoreService.request<void>({
    url: `/user/${pathParameters.username}`,
    method: 'delete',
    ...config,
  });
}
/**
 * Logs user into the system
 */
export function getUserLogin(queryParameters: PetStore.LoginUser.QueryParameters, config?: AxiosRequestConfig) {
  return petStoreService.request<string>({
    url: '/user/login',
    method: 'get',
    params: queryParameters,
    ...config,
  });
}
/**
 * Logs out current logged in user session
 */
export function getUserLogout(config?: AxiosRequestConfig) {
  return petStoreService.request<void>({
    url: '/user/logout',
    method: 'get',
    ...config,
  });
}
/**
 * Creates list of users with given input array
 */
export function postUserCreateWithArray(
  bodyParameters: PetStore.CreateUsersWithArrayInput.BodyParameters['body'],
  config?: AxiosRequestConfig,
) {
  return petStoreService.request<void>({
    url: '/user/createWithArray',
    method: 'post',
    data: bodyParameters,
    ...config,
  });
}
/**
 * Create user
 *
 * @description This can only be done by the logged in user.
 */
export function postUser(bodyParameters: PetStore.CreateUser.BodyParameters['body'], config?: AxiosRequestConfig) {
  return petStoreService.request<void>({
    url: '/user',
    method: 'post',
    data: bodyParameters,
    ...config,
  });
}
