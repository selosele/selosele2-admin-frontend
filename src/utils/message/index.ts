import Swal from 'sweetalert2'

/**
 * 메시지 유틸
 */
class MessageUtil {

  _alert = null
  _confirm = null
  _toast = null

  constructor() {
    this._alert = Swal.mixin({})

    this._confirm = Swal.mixin({
			showCancelButton: true,
			confirmButtonText: '예',
			cancelButtonText: '아니오',
		})

    this._toast = Swal.mixin({
      toast: true,
      width: 450,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
    })
  }

  /** Alert 성공 타입 */
  alertSuccess(title: string, text = '') {
    return new Promise((resolve,_) => {
			this._alert.fire({
				title: title,
				text: text,
				icon: 'success',
			}).then(res => resolve(res.isConfirmed))
		})
  }

  /** Alert 오류 타입 */
  alertError(title: string, text = '') {
    return new Promise((resolve,_) => {
			this._alert.fire({
				title: title,
				text: text,
				icon: 'error',
			}).then(res => resolve(res.isConfirmed))
		})
  }

  /** Alert 경고 타입 */
  alertWarning(title: string, text = '') {
    return new Promise((resolve,_) => {
			this._alert.fire({
				title: title,
				text: text,
				icon: 'warning',
			}).then(res => resolve(res.isConfirmed))
		})
  }

  /** Alert 정보 타입 */
  alertInfo(title: string, text = '') {
    return new Promise((resolve,_) => {
			this._alert.fire({
				title: title,
				text: text,
				icon: 'info',
			}).then(res => resolve(res.isConfirmed))
		})
  }

  /** Alert 질문 타입 */
  alertQuestion(title: string, text = '') {
    return new Promise((resolve,_) => {
			this._alert.fire({
				title: title,
				text: text,
				icon: 'question',
			}).then(res => resolve(res.isConfirmed))
		})
  }

  /** Confirm 성공 타입 */
  confirmSuccess(title: string, text = '') {
    return new Promise((resolve,_) => {
			this._confirm.fire({
				title: title,
				text: text,
				icon: 'success',
			}).then(res => resolve(res.isConfirmed))
		})
  }

  /** Confirm 오류 타입 */
  confirmError(title: string, text = '') {
    return new Promise((resolve,_) => {
			this._confirm.fire({
				title: title,
				text: text,
				icon: 'error',
			}).then(res => resolve(res.isConfirmed))
		})
  }

  /** Confirm 경고 타입 */
  confirmWarning(title: string, text = '') {
    return new Promise((resolve,_) => {
			this._confirm.fire({
				title: title,
				text: text,
				icon: 'warning',
			}).then(res => resolve(res.isConfirmed))
		})
  }

  /** Confirm 정보 타입 */
  confirmInfo(title: string, text = '') {
    return new Promise((resolve,_) => {
			this._confirm.fire({
				title: title,
				text: text,
				icon: 'info',
			}).then(res => resolve(res.isConfirmed))
		})
  }

  /** Confirm 질문 타입 */
  confirmQuestion(title: string, text = '') {
    return new Promise((resolve,_) => {
			this._confirm.fire({
				title: title,
				text: text,
				icon: 'question',
			}).then(res => resolve(res.isConfirmed))
		})
  }

  /** Toast 성공 타입 */
  toastSuccess(title: string) {
    this._toast.fire({
      icon: 'success',
      title: title,
    })
  }

  /** Toast 오류 타입 */
  toastError(title: string) {
    this._toast.fire({
      icon: 'error',
      title: title,
    })
  }

  /** Toast 경고 타입 */
  toastWarning(title: string) {
    this._toast.fire({
      icon: 'warning',
      title: title,
    })
  }

  /** Toast 정보 타입 */
  toastInfo(title: string) {
    this._toast.fire({
      icon: 'info',
      title: title,
    })
  }

  /** Toast 질문 타입 */
  toastQuestion(title: string) {
    this._toast.fire({
      icon: 'question',
      title: title,
    })
  }
	
}

export const messageUtil = new MessageUtil()
