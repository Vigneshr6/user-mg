export function CreateSuspenseResource(promise,responseParser) {
    let status = "pending";
    let result;
    let suspender = promise.then(
      (r) => {
        status = "success";
        result = responseParser(r);
      },
      (e) => {
        status = "error";
        result = e;
      }
    );
    return {
      read() {
        if (status === "pending") {
          throw suspender;
        } else if (status === "error") {
          throw result;
        } else if (status === "success") {
          return result;
        }
      },
    };
  }