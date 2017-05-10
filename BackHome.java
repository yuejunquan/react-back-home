package com.backHome;

import android.content.Intent;
import android.support.v4.app.ActivityCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by yjq on 2017/5/8.
 */

public class BackHome extends ReactContextBaseJavaModule {
    public BackHome(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "BackHome";
    }

    @ReactMethod
    public void go() {
        //启动一个意图,回到桌面
        Intent backHome = new Intent(Intent.ACTION_MAIN);
        backHome.addCategory(Intent.CATEGORY_HOME);
        ActivityCompat.startActivity(getCurrentActivity(), backHome, null);
    }


}
