import axios, { AxiosError } from 'axios';
import { authenticateSilently } from './auth';
import { metricKeys, metricStatus, track } from './appInsights';
import * as FileSystem from 'expo-file-system';
import * as Device from 'expo-device';

export type BaseResource = {
  scopes: string[];
  apiBaseUrl: string;
  subscriptionKey?: string;
};

export type BaseAPIOptions = {
  authenticate?: boolean;
  headers?: Record<string, any>;
};
const defaultOptions = {
  authenticate: true,
};

class BaseApiService {
  url: string;

  scopes: string[];

  subscriptionKey?: string;

  constructor(resource: BaseResource) {
    this.url = resource.apiBaseUrl;
    this.scopes = resource.scopes;
    this.subscriptionKey = resource.subscriptionKey;
  }

  async get(path: string, options: BaseAPIOptions = defaultOptions) {
    const tokenRes = options.authenticate
      ? await authenticateSilently(this.scopes)
      : undefined;
    const apiUrl = this.url + path;
    track(
      metricKeys.API_GET,
      metricStatus.STARTED,
      path,
      createDefaultLogObject(apiUrl)
    );
    return axios
      .get(apiUrl, {
        headers: { ...this.defaultHeader(tokenRes), ...options.headers },
      })
      .then((res) => {
        track(
          metricKeys.API_GET,
          metricStatus.SUCCESS,
          path,
          createDefaultLogObject(apiUrl)
        );
        return res;
      })
      .catch((error: AxiosError | Error) => {
        track(
          metricKeys.API_GET,
          metricStatus.FAILED,
          path,
          createErrorObject(error, apiUrl)
        );
        throw error;
      });
  }

  async post(
    path: string,
    data: unknown,
    options: BaseAPIOptions = defaultOptions
  ) {
    const tokenRes = options.authenticate
      ? await authenticateSilently(this.scopes)
      : undefined;
    const apiUrl = this.url + path;
    track(
      metricKeys.API_POST,
      metricStatus.STARTED,
      path,
      createDefaultLogObject(apiUrl)
    );
    return axios
      .post(this.url + path, data, {
        headers: { ...this.defaultHeader(tokenRes), ...options.headers },
      })
      .then((res) => {
        track(
          metricKeys.API_POST,
          metricStatus.SUCCESS,
          path,
          createDefaultLogObject(apiUrl)
        );
        return res;
      })
      .catch((error: AxiosError | Error) => {
        track(
          metricKeys.API_POST,
          metricStatus.FAILED,
          path,
          createErrorObject(error, apiUrl)
        );
        throw error;
      });
  }

  async put(
    path: string,
    data: unknown,
    options: BaseAPIOptions = defaultOptions
  ) {
    const tokenRes = options.authenticate
      ? await authenticateSilently(this.scopes)
      : undefined;
    const apiUrl = this.url + path;
    track(
      metricKeys.API_PUT,
      metricStatus.STARTED,
      path,
      createDefaultLogObject(apiUrl)
    );
    return axios
      .put(this.url + path, data, {
        headers: { ...this.defaultHeader(tokenRes), ...options.headers },
      })
      .then((res) => {
        track(
          metricKeys.API_PUT,
          metricStatus.SUCCESS,
          path,
          createDefaultLogObject(apiUrl)
        );
        return res;
      })
      .catch((error: AxiosError | Error) => {
        track(
          metricKeys.API_PUT,
          metricStatus.FAILED,
          path,
          createErrorObject(error, apiUrl)
        );
        throw error;
      });
  }

  async patch(
    path: string,
    data: unknown,
    options: BaseAPIOptions = defaultOptions
  ) {
    const tokenRes = options.authenticate
      ? await authenticateSilently(this.scopes)
      : undefined;
    const apiUrl = this.url + path;
    track(
      metricKeys.API_PATCH,
      metricStatus.STARTED,
      path,
      createDefaultLogObject(apiUrl)
    );
    return axios
      .patch(this.url + path, data, {
        headers: { ...this.defaultHeader(tokenRes), ...options.headers },
      })
      .then((res) => {
        track(
          metricKeys.API_PATCH,
          metricStatus.SUCCESS,
          path,
          createDefaultLogObject(apiUrl)
        );
        return res;
      })
      .catch((error: AxiosError | Error) => {
        track(
          metricKeys.API_PATCH,
          metricStatus.FAILED,
          path,
          createErrorObject(error, apiUrl)
        );
        throw error;
      });
  }

  async delete(
    path: string,
    data?: unknown,
    options: BaseAPIOptions = defaultOptions
  ) {
    const tokenRes = options.authenticate
      ? await authenticateSilently(this.scopes)
      : undefined;
    const apiUrl = this.url + path;
    track(
      metricKeys.API_DELETE,
      metricStatus.STARTED,
      path,
      createDefaultLogObject(apiUrl)
    );
    return axios
      .delete(this.url + path, {
        headers: { ...this.defaultHeader(tokenRes), ...options.headers },
        data: data ?? null,
      })
      .then((res) => {
        track(
          metricKeys.API_DELETE,
          metricStatus.SUCCESS,
          path,
          createDefaultLogObject(apiUrl)
        );
        return res;
      })
      .catch((error: AxiosError | Error) => {
        track(
          metricKeys.API_DELETE,
          metricStatus.FAILED,
          path,
          createErrorObject(error, apiUrl)
        );
        throw error;
      });
  }

  /**
   * Generic upload helper function. In most cases you would want to use _uploadFromFileSystem_ instead
   * @param path
   * @param formData
   * @param options
   * @returns
   */
  async uploadFile(
    path: string,
    formData: unknown,
    options: BaseAPIOptions = defaultOptions
  ) {
    const tokenRes = options.authenticate
      ? await authenticateSilently(this.scopes)
      : undefined;
    const apiUrl = this.url + path;
    track(
      metricKeys.API_UPLOAD,
      metricStatus.STARTED,
      path,
      createDefaultLogObject(apiUrl)
    );
    return axios
      .post(this.url + path, formData, {
        headers: {
          ...this.defaultHeader(tokenRes),
          ...options.headers,
          'content-type': 'multipart/form-data',
        },
      })
      .then((res) => {
        track(
          metricKeys.API_UPLOAD,
          metricStatus.SUCCESS,
          path,
          createDefaultLogObject(apiUrl)
        );
        return res;
      })
      .catch((error: AxiosError | Error) => {
        track(
          metricKeys.API_UPLOAD,
          metricStatus.FAILED,
          path,
          createErrorObject(error, apiUrl)
        );
        throw error;
      });
  }

  /**
   * upload file from the file system
   * @param path api path
   * @param fileUri path to file in file system
   * @param slug custom SAP header, leave undefined if not in use
   * @param contentType file type
   * @param options provide additional headers, or disable authentication
   * @returns FileSystemUploadResult
   */
  async uploadFromFileSystem(
    path: string,
    fileUri: string,
    slug: string | undefined,
    contentType: string,
    options: BaseAPIOptions = defaultOptions
  ) {
    const tokenRes = options.authenticate
      ? await authenticateSilently(this.scopes)
      : undefined;
    const apiUrl = this.url + path;
    track(
      metricKeys.API_UPLOAD,
      metricStatus.STARTED,
      path,
      createDefaultLogObject(apiUrl)
    );
    return FileSystem.uploadAsync(`${this.url}${path}`, fileUri, {
      httpMethod: 'POST',
      headers: {
        ...this.defaultHeader(tokenRes),
        ...options.headers,
        'content-type': contentType,
        'SLUG': slug,
      },
    })
      .then((res) => {
        track(
          metricKeys.API_UPLOAD,
          metricStatus.SUCCESS,
          path,
          createDefaultLogObject(apiUrl)
        );
        return res;
      })
      .catch((error: AxiosError | Error) => {
        track(
          metricKeys.API_UPLOAD,
          metricStatus.FAILED,
          path,
          createErrorObject(error, apiUrl)
        );
        throw error;
      });
  }

  async downloadFromFileSystem(
    path: string,
    fileName: string,
    options: BaseAPIOptions = defaultOptions
  ) {
    const tokenRes = options.authenticate
      ? await authenticateSilently(this.scopes)
      : undefined;
    const apiUrl = this.url + path;
    const headers = { ...this.defaultHeader(tokenRes), ...options.headers };
    const fileUri = `${FileSystem.cacheDirectory}${fileName}`;
    if (Device.osName === 'ios') {
      track(
        metricKeys.API_DOWNLOAD,
        metricStatus.STARTED,
        path,
        createDefaultLogObject(apiUrl)
      );
      return await FileSystem.downloadAsync(apiUrl, fileUri, {
        headers,
      })
        .then((res) => {
          track(
            metricKeys.API_DOWNLOAD,
            metricStatus.SUCCESS,
            path,
            createDefaultLogObject(apiUrl)
          );
          return res;
        })
        .catch((error: AxiosError | Error) => {
          track(
            metricKeys.API_DOWNLOAD,
            metricStatus.FAILED,
            path,
            createErrorObject(error, apiUrl)
          );
          throw error;
        });
    }
    if (Device.osName === 'web') {
      track(metricKeys.API_DOWNLOAD, metricStatus.FAILED, 'Web not supported');
      // @ts-expect-error mad-expo-core doesn't know about web? idk
      alert('Download not implemented for web');
    }

    return '';
  }

  defaultHeader = (tokenRes: { accessToken: string } | undefined) => ({
    'ContentType': 'application/json',
    'Ocp-Apim-Subscription-Key': this.subscriptionKey
      ? this.subscriptionKey
      : '',
    'Ocp-Apim-Trace': 'true',
    'Authorization': tokenRes ? `Bearer ${tokenRes.accessToken}` : '',
  });
}

function createDefaultLogObject(apiUrl: string) {
  return { apiUrl };
}

function createErrorObject(
  error: AxiosError | Error | unknown,
  apiUrl?: string
) {
  // In the future we probably want more details in the log, which is why
  // we separate axios errors and normal errors below, even though they
  // currently return the same parameter
  if (axios.isAxiosError(error)) {
    return { errorMessage: error.message, apiUrl };
  } else if ((error as Error)?.message) {
    return { errorMessage: (error as Error)?.message, apiUrl };
  }
  return { errorMessage: 'Unknown error', apiUrl };
}

export default BaseApiService;