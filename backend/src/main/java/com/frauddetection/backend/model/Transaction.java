package com.frauddetection.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Transaction {
    @JsonProperty("Time")
    private double time;
    @JsonProperty("V1")
    private double v1;
    @JsonProperty("V2")
    private double v2;
    @JsonProperty("V3")
    private double v3;
    @JsonProperty("V4")
    private double v4;
    @JsonProperty("V5")
    private double v5;
    @JsonProperty("V6")
    private double v6;
    @JsonProperty("V7")
    private double v7;
    @JsonProperty("V8")
    private double v8;
    @JsonProperty("V9")
    private double v9;
    @JsonProperty("V10")
    private double v10;
    @JsonProperty("V11")
    private double v11;
    @JsonProperty("V12")
    private double v12;
    @JsonProperty("V13")
    private double v13;
    @JsonProperty("V14")
    private double v14;
    @JsonProperty("V15")
    private double v15;
    @JsonProperty("V16")
    private double v16;
    @JsonProperty("V17")
    private double v17;
    @JsonProperty("V18")
    private double v18;
    @JsonProperty("V19")
    private double v19;
    @JsonProperty("V20")
    private double v20;
    @JsonProperty("V21")
    private double v21;
    @JsonProperty("V22")
    private double v22;
    @JsonProperty("V23")
    private double v23;
    @JsonProperty("V24")
    private double v24;
    @JsonProperty("V25")
    private double v25;
    @JsonProperty("V26")
    private double v26;
    @JsonProperty("V27")
    private double v27;
    @JsonProperty("V28")
    private double v28;
    @JsonProperty("Amount")
    private double amount;

    public Transaction(double time, double v1, double v2, double v3, double v4, double v5, double v6, double v7,
            double v8, double v9, double v10, double v11, double v12, double v13, double v14, double v15, double v16,
            double v17, double v18, double v19, double v20, double v21, double v22, double v23, double v24, double v25,
            double v26, double v27, double v28, double amount) {
        this.time = time;
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
        this.v4 = v4;
        this.v5 = v5;
        this.v6 = v6;
        this.v7 = v7;
        this.v8 = v8;
        this.v9 = v9;
        this.v10 = v10;
        this.v11 = v11;
        this.v12 = v12;
        this.v13 = v13;
        this.v14 = v14;
        this.v15 = v15;
        this.v16 = v16;
        this.v17 = v17;
        this.v18 = v18;
        this.v19 = v19;
        this.v20 = v20;
        this.v21 = v21;
        this.v22 = v22;
        this.v23 = v23;
        this.v24 = v24;
        this.v25 = v25;
        this.v26 = v26;
        this.v27 = v27;
        this.v28 = v28;
        this.amount = amount;
    }

    public double getTime() { return time; }
    public void setTime(double time) { this.time = time; }
    public double getV1() { return v1; }
    public void setV1(double v1) { this.v1 = v1; }
    public double getV2() { return v2; }
    public void setV2(double v2) { this.v2 = v2; }
    public double getV3() { return v3; }
    public void setV3(double v3) { this.v3 = v3; }
    public double getV4() { return v4; }
    public void setV4(double v4) { this.v4 = v4; }
    public double getV5() { return v5; }
    public void setV5(double v5) { this.v5 = v5; }
    public double getV6() { return v6; }
    public void setV6(double v6) { this.v6 = v6; }
    public double getV7() { return v7; }
    public void setV7(double v7) { this.v7 = v7; }
    public double getV8() { return v8; }
    public void setV8(double v8) { this.v8 = v8; }
    public double getV9() { return v9; }
    public void setV9(double v9) { this.v9 = v9; }
    public double getV10() { return v10; }
    public void setV10(double v10) { this.v10 = v10; }
    public double getV11() { return v11; }
    public void setV11(double v11) { this.v11 = v11; }
    public double getV12() { return v12; }
    public void setV12(double v12) { this.v12 = v12; }
    public double getV13() { return v13; }
    public void setV13(double v13) { this.v13 = v13; }
    public double getV14() { return v14; }
    public void setV14(double v14) { this.v14 = v14; }
    public double getV15() { return v15; }
    public void setV15(double v15) { this.v15 = v15; }
    public double getV16() { return v16; }
    public void setV16(double v16) { this.v16 = v16; }
    public double getV17() { return v17; }
    public void setV17(double v17) { this.v17 = v17; }
    public double getV18() { return v18; }
    public void setV18(double v18) { this.v18 = v18; }
    public double getV19() { return v19; }
    public void setV19(double v19) { this.v19 = v19; }
    public double getV20() { return v20; }
    public void setV20(double v20) { this.v20 = v20; }
    public double getV21() { return v21; }
    public void setV21(double v21) { this.v21 = v21; }
    public double getV22() { return v22; }
    public void setV22(double v22) { this.v22 = v22; }
    public double getV23() { return v23; }
    public void setV23(double v23) { this.v23 = v23; }
    public double getV24() { return v24; }
    public void setV24(double v24) { this.v24 = v24; }
    public double getV25() { return v25; }
    public void setV25(double v25) { this.v25 = v25; }
    public double getV26() { return v26; }
    public void setV26(double v26) { this.v26 = v26; }
    public double getV27() { return v27; }
    public void setV27(double v27) { this.v27 = v27; }
    public double getV28() { return v28; }
    public void setV28(double v28) { this.v28 = v28; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
}