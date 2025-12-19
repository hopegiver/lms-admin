export default {
    name: 'PaymentSettings',
    layout: 'admin',
    data() {
        return {
            settings: {
                enableCard: true,
                enableBank: true,
                enableVirtualAccount: true,
                enablePhone: false,
                enableKakaoPay: true,
                enableNaverPay: true,
                pgProvider: 'toss',
                pgEnvironment: 'sandbox',
                merchantId: 'test_merchant_001',
                apiKey: '••••••••••••••••',
                refundDays: 7,
                refundProgress: 10,
                refundFee: 10,
                refundPolicy: '수강 시작 후 7일 이내, 진도율 10% 이하인 경우에만 환불이 가능합니다. 환불 시 결제 금액의 10%가 수수료로 차감됩니다.',
                enableCoupon: true,
                couponStackable: 'none',
                maxDiscount: 50
            }
        }
    },
    methods: {
        saveSettings() {
            alert('결제 설정이 저장되었습니다.');
        }
    }
}
