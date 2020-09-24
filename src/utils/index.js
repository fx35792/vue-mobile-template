//校验输入文字为纯数字
export function validNumber(value) {
	const reg = /^\d+$/;
	return reg.test(value);
}

//校验输入的文字 --综合搜索
export function validText(value) {
	const reg = /^([\u4E00-\u9FA5])*$/;
	return reg.test(value);
}

//电话号码正则函数
export function checkPhone(value) {
	const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
	return reg.test(value);
}

//邮箱正则函数
export function checkEmail(value) {
	const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
	return reg.test(value);
}

//2-10位中英文
export function checkUserName(value) {
	const reg = /^[\u4E00-\u9FA5A-Za-z]{2,10}$/;
	return reg.test(value);
}

//去除空格
export function removeSpace(value) {
	const reg = /\s+/g;
	return value.replace(reg, "");
}

//为空或全部为空格
export function checkSpace(value) {
	const reg = /^[ ]*$/;
	return reg.test(value);
}

//判断密码大于6位，数字、字母大小写组合
export function checkPassWord(value) {
	let regNumber = /\d+/;
	let regString = /[a-zA-Z]+/;
	return regNumber.test(value) && regString.test(value) && value.length >= 8 && value.length <= 20;
}

//获取周几
export function weeks(day) {
	let myDate = day ? new Date(day) : new Date();
	let wk = myDate.getDay();
	switch (wk) {
	case 0:
		return '星期日';
	case 1:
		return '星期一';
	case 2:
		return '星期二';
	case 3:
		return '星期三';
	case 4:
		return '星期四';
	case 5:
		return '星期五';
	case 6:
		return '星期六';
	}
	return wk;
}

export function checkIdCard(value) {
	const idCardNo = value;
	if(idCardNo.length === 18) {
		const birStr = value.substr(6, 8);
		const sexFlag = idCardNo.charAt(16) - 0; //奇数男 偶数女
		const sexfromIDcard = sexFlag % 2; //1男 0女
		return {sex: sexfromIDcard===1?0:1, birStr};
	} else if(idCardNo.length === 15) {
		const birStr = '19' + value.substr(6, 6);
		const sexFlag2 = idCardNo.charAt(14) - 0; //奇数男 偶数女
		const sexfromIDcard2 = sexFlag2 % 2; //1男 0女
		return {sex: sexfromIDcard2===1?0:1, birStr};
	}
}

// 获取当前时间年月日时分秒
export function getNowData(type) {
	let date = new Date();

	let year = date.getFullYear();

	let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
	let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	let lastDay = date.getDate() - 1 < 10 ? '0' + (date.getDate() - 1) : date.getDate() - 1;
	let hour = date.getHours();
	let minute = date.getMinutes();
	let second = date.getSeconds();
	switch (type) {
	case 1:
		return `${year}-${month}-${day}`;
	case 2:
		return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
	case 3:
		return day;
	case 4:
		return `${year}.${month}`;
	case 5:
		return `${year}-${month}-${lastDay}`;
	default:
		return `${year}-${month}-${day}`;
	}
}

//数组排序
export function compare(property) {
	return function (a, b) {
		var value1 = a[property];
		var value2 = b[property];
		return value1 - value2;
	};
}