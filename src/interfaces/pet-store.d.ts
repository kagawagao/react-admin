declare namespace PetStore {
  export interface ApiResponse {
    code?: number; // int32
    type?: string;
    message?: string;
  }
  export interface Category {
    id?: number; // int64
    name?: string;
  }
  export interface Order {
    id?: number; // int64
    petId?: number; // int64
    quantity?: number; // int32
    shipDate?: string; // date-time
    /**
     * Order Status
     */
    status?: 'placed' | 'approved' | 'delivered';
    complete?: boolean;
  }
  export interface Pet {
    id?: number; // int64
    category?: Category;
    /**
     * example:
     * doggie
     */
    name: string;
    photoUrls: string[];
    tags?: Tag[];
    /**
     * pet status in the store
     */
    status?: 'available' | 'pending' | 'sold';
  }
  export interface Tag {
    id?: number; // int64
    name?: string;
  }
  export interface User {
    id?: number; // int64
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    /**
     * User Status
     */
    userStatus?: number; // int32
  }
}
declare namespace PetStore {
  namespace AddPet {
    export interface BodyParameters {
      body: Parameters.Body;
    }
    namespace Parameters {
      export type Body = PetStore.Pet;
    }
  }
  namespace CreateUser {
    export interface BodyParameters {
      body: Parameters.Body;
    }
    namespace Parameters {
      export type Body = PetStore.User;
    }
  }
  namespace CreateUsersWithArrayInput {
    export interface BodyParameters {
      body: Parameters.Body;
    }
    namespace Parameters {
      export type Body = PetStore.User[];
    }
  }
  namespace CreateUsersWithListInput {
    export interface BodyParameters {
      body: Parameters.Body;
    }
    namespace Parameters {
      export type Body = PetStore.User[];
    }
  }
  namespace DeleteOrder {
    namespace Parameters {
      /**
       * ID of the order that needs to be deleted
       */
      export type OrderId = number; // int64
    }
    export interface PathParameters {
      orderId: /* ID of the order that needs to be deleted */ Parameters.OrderId /* int64 */;
    }
  }
  namespace DeletePet {
    export interface HeaderParameters {
      api_key?: Parameters.ApiKey;
    }
    namespace Parameters {
      export type ApiKey = string;
      /**
       * Pet id to delete
       */
      export type PetId = number; // int64
    }
    export interface PathParameters {
      petId: /* Pet id to delete */ Parameters.PetId /* int64 */;
    }
  }
  namespace DeleteUser {
    namespace Parameters {
      /**
       * The name that needs to be deleted
       */
      export type Username = string;
    }
    export interface PathParameters {
      username: /* The name that needs to be deleted */ Parameters.Username;
    }
  }
  namespace FindPetsByStatus {
    namespace Parameters {
      /**
       * Status values that need to be considered for filter
       */
      export type Status = ('available' | 'pending' | 'sold')[];
    }
    export interface QueryParameters {
      status: /* Status values that need to be considered for filter */ Parameters.Status;
    }
    namespace Responses {
      export type $200 = PetStore.Pet[];
    }
  }
  namespace FindPetsByTags {
    namespace Parameters {
      /**
       * Tags to filter by
       */
      export type Tags = string[];
    }
    export interface QueryParameters {
      tags: /* Tags to filter by */ Parameters.Tags;
    }
    namespace Responses {
      export type $200 = PetStore.Pet[];
    }
  }
  namespace GetInventory {
    namespace Responses {
      export interface $200 {
        [name: string]: number; // int32
      }
    }
  }
  namespace GetOrderById {
    namespace Parameters {
      /**
       * ID of pet that needs to be fetched
       */
      export type OrderId = number; // int64
    }
    export interface PathParameters {
      orderId: /* ID of pet that needs to be fetched */ Parameters.OrderId /* int64 */;
    }
    namespace Responses {
      export type $200 = PetStore.Order;
    }
  }
  namespace GetPetById {
    namespace Parameters {
      /**
       * ID of pet to return
       */
      export type PetId = number; // int64
    }
    export interface PathParameters {
      petId: /* ID of pet to return */ Parameters.PetId /* int64 */;
    }
    namespace Responses {
      export type $200 = PetStore.Pet;
    }
  }
  namespace GetUserByName {
    namespace Parameters {
      /**
       * The name that needs to be fetched. Use user1 for testing.
       */
      export type Username = string;
    }
    export interface PathParameters {
      username: /* The name that needs to be fetched. Use user1 for testing.  */ Parameters.Username;
    }
    namespace Responses {
      export type $200 = PetStore.User;
    }
  }
  namespace LoginUser {
    namespace Parameters {
      /**
       * The password for login in clear text
       */
      export type Password = string;
      /**
       * The user name for login
       */
      export type Username = string;
    }
    export interface QueryParameters {
      username: /* The user name for login */ Parameters.Username;
      password: /* The password for login in clear text */ Parameters.Password;
    }
    namespace Responses {
      export type $200 = string;
    }
  }
  namespace PlaceOrder {
    export interface BodyParameters {
      body: Parameters.Body;
    }
    namespace Parameters {
      export type Body = PetStore.Order;
    }
    namespace Responses {
      export type $200 = PetStore.Order;
    }
  }
  namespace UpdatePet {
    export interface BodyParameters {
      body: Parameters.Body;
    }
    namespace Parameters {
      export type Body = PetStore.Pet;
    }
  }
  namespace UpdatePetWithForm {
    export interface FormDataParameters {
      name?: /* Updated name of the pet */ Parameters.Name;
      status?: /* Updated status of the pet */ Parameters.Status;
    }
    namespace Parameters {
      /**
       * Updated name of the pet
       */
      export type Name = string;
      /**
       * ID of pet that needs to be updated
       */
      export type PetId = number; // int64
      /**
       * Updated status of the pet
       */
      export type Status = string;
    }
    export interface PathParameters {
      petId: /* ID of pet that needs to be updated */ Parameters.PetId /* int64 */;
    }
  }
  namespace UpdateUser {
    export interface BodyParameters {
      body: Parameters.Body;
    }
    namespace Parameters {
      export type Body = PetStore.User;
      /**
       * name that need to be updated
       */
      export type Username = string;
    }
    export interface PathParameters {
      username: /* name that need to be updated */ Parameters.Username;
    }
  }
  namespace UploadFile {
    export interface FormDataParameters {
      additionalMetadata?: /* Additional data to pass to server */ Parameters.AdditionalMetadata;
      file?: /* file to upload */ Parameters.File;
    }
    namespace Parameters {
      /**
       * Additional data to pass to server
       */
      export type AdditionalMetadata = string;
      /**
       * file to upload
       */
      export type File = unknown;
      /**
       * ID of pet to update
       */
      export type PetId = number; // int64
    }
    export interface PathParameters {
      petId: /* ID of pet to update */ Parameters.PetId /* int64 */;
    }
    namespace Responses {
      export type $200 = PetStore.ApiResponse;
    }
  }
}
