This is a snippet of code that lets you check network status and speed in your android app 

Another code snippet that does the same thing 
```
 ConnectivityManager cm = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
                                NetworkInfo netInfo = cm.getActiveNetworkInfo();
                                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                                    //should check null because in airplane mode it will be null
                                    NetworkCapabilities nc = cm.getNetworkCapabilities(cm.getActiveNetwork());
                                    int downSpeed = nc.getLinkDownstreamBandwidthKbps();
                                    int upSpeed = nc.getLinkUpstreamBandwidthKbps();

                                    Log.e(TAG, "downSpeed: " + downSpeed);
                                    Log.e(TAG, "upSpeed: " + upSpeed);
                                } else {
                                    NetworkInfo activeNetwork = cm.getActiveNetworkInfo();

                                }
```


ConnectivityManager Code snippet to be added to your activity 

```

        ConnectionUtil connectionUtil;
        connectionUtil = new ConnectionUtil();

        NetworkRequest networkRequest = new NetworkRequest.Builder()
                .addCapability(NetworkCapabilities.NET_CAPABILITY_INTERNET)
                .addTransportType(NetworkCapabilities.TRANSPORT_WIFI)
                .addTransportType(NetworkCapabilities.TRANSPORT_CELLULAR)
                .build();

        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
            ConnectivityManager connectivityManager = (ConnectivityManager) getSystemService(ConnectivityManager.class);
            connectivityManager.requestNetwork(networkRequest, networkCallback);
        }

// --


    private ConnectivityManager.NetworkCallback networkCallback = new ConnectivityManager.NetworkCallback() {
        @Override
        public void onAvailable(@NonNull Network network) {
            Log.e(TAG, "onAvailable: " );
            super.onAvailable(network);
            connectionUtil.checkConnectionType(context);
        }

        @Override
        public void onLost(@NonNull Network network) {
            Log.e(TAG, "onLost: " );
            super.onLost(network);
        }

        @Override
        public void onCapabilitiesChanged(@NonNull Network network, @NonNull NetworkCapabilities networkCapabilities) {
            super.onCapabilitiesChanged(network, networkCapabilities);
            Log.e(TAG, "onCapabilitiesChanged: " );
            final boolean unmetered = networkCapabilities.hasCapability(NetworkCapabilities.NET_CAPABILITY_NOT_METERED);
        }
    };

```


Connection Util class 

```

public class ConnectionUtil {
    private static final String TAG = "ConnectionUtil";
    public ConnectionUtil() {
    }

    public void checkConnectionSpeed(Context context){
        Log.e(TAG, "checkConnectionSpeed: " );
        ConnectivityManager cm = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo netInfo = cm.getActiveNetworkInfo();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            //should check null because in airplane mode it will be null
            NetworkCapabilities nc = cm.getNetworkCapabilities(cm.getActiveNetwork());
            int downSpeed = nc.getLinkDownstreamBandwidthKbps();
            int upSpeed = nc.getLinkUpstreamBandwidthKbps();

            Log.e(TAG, "downSpeed: " + downSpeed);
            Log.e(TAG, "upSpeed: " + upSpeed);
        } else {
            NetworkInfo activeNetwork = cm.getActiveNetworkInfo();

        }
    }

    public void checkConnectionType(Context context){
        int result = 0; // Returns connection type. 0: none; 1: mobile data; 2: wifi; 3: vpn

        ConnectivityManager cm = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (cm != null) {
                NetworkCapabilities capabilities = cm.getNetworkCapabilities(cm.getActiveNetwork());
                if (capabilities != null) {
                    if (capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI)) {
                        result = 2;
                    } else if (capabilities.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR)) {
                        result = 1;
                    } else if (capabilities.hasTransport(NetworkCapabilities.TRANSPORT_VPN)) {
                        result = 3;
                    }
                }
            }
        } else {
            if (cm != null) {
                NetworkInfo activeNetwork = cm.getActiveNetworkInfo();
                if (activeNetwork != null) {
                    // connected to the internet
                    if (activeNetwork.getType() == ConnectivityManager.TYPE_WIFI) {
                        result = 2;
                    } else if (activeNetwork.getType() == ConnectivityManager.TYPE_MOBILE) {
                        result = 1;
                    } else if (activeNetwork.getType() == ConnectivityManager.TYPE_VPN) {
                        result = 3;
                    }
                }
            }
        }
        if (result != 0) {
            ConnectivityManager connectivityManager
                    = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
            NetworkInfo activeNetworkInfo = connectivityManager.getActiveNetworkInfo();
            Log.e(TAG, "displayMenu: " + activeNetworkInfo.getType());
            Log.e(TAG, "displayMenu: " + activeNetworkInfo.getTypeName());
            Log.e(TAG, "displayMenu: " + activeNetworkInfo.getSubtypeName());
            Log.e(TAG, "displayMenu: " + activeNetworkInfo.getSubtype());
            Log.e(TAG, "isConnectedOrConnecting: " + activeNetworkInfo.isConnectedOrConnecting());
            Log.e(TAG, "isConnected: " + activeNetworkInfo.isConnected());
            Log.e(TAG, "isAvailable: " + activeNetworkInfo.isAvailable());
            Log.e(TAG, "getState: " + activeNetworkInfo.getState());
            Log.e(TAG, "getDetailedState: " + activeNetworkInfo.getDetailedState());
            Log.e(TAG, "getReason: " + activeNetworkInfo.getReason());
        }
        Log.e(TAG, "result: " + result);
    }

    long startTime;
    long endTime;
    long fileSize;
    OkHttpClient client = new OkHttpClient();

    // bandwidth in kbps
    private int POOR_BANDWIDTH = 150;
    private int AVERAGE_BANDWIDTH = 550;
    private int GOOD_BANDWIDTH = 2000;


    public void checkInternetSpeed(){

        Log.e(TAG, "checkInternetSpeed: ");


        Request request = new Request.Builder()
                .url("https://via.placeholder.com/150C/O")
                .build();

//    Duration duration = Duration;
        java.time.LocalDateTime startDateTime = java.time.LocalDateTime.now();
        startTime = System.currentTimeMillis();


        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {

            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                InputStream input = response.body().byteStream();
                try {
                    ByteArrayOutputStream bos = new ByteArrayOutputStream();
                    byte[] buffer = new byte[1024];

                    while (input.read(buffer) != -1) {
                        bos.write(buffer);
                    }
                    byte[] docBuffer = bos.toByteArray();
                    fileSize = bos.size();

                } finally {
                    input.close();
                }

                endTime = System.currentTimeMillis();


                // calculate how long it took by subtracting endtime from starttime

                double timeTakenMills = Math.floor(endTime - startTime);  // time taken in milliseconds
                double timeTakenSecs = timeTakenMills / 1000;  // divide by 1000 to get time in seconds
                final int kilobytePerSec = (int) Math.round(1024 / timeTakenSecs);

                if(kilobytePerSec <= POOR_BANDWIDTH){
                    // slow connection
                    Log.e(TAG, "onResponse: POOR_BANDWIDTH" );
                }else if(kilobytePerSec <= AVERAGE_BANDWIDTH){
                    Log.e(TAG, "onResponse: AVERAGE_BANDWIDTH" );
                }else {
                    Log.e(TAG, "onResponse: GOOD_BANDWIDTH" );
                }

                // get the download speed by dividing the file size by time taken to download
                double speed = fileSize / timeTakenMills;

                Log.e(TAG, "Time taken in secs: " + timeTakenSecs);
                Log.e(TAG, "kilobyte per sec: " + kilobytePerSec);
                Log.e(TAG, "Download Speed: " + speed);
                Log.e(TAG, "File size: " + fileSize);

            }
        });

//        client.newCall(request).enqueue(new Callback() {
//            @Override
//            public void onFailure(Request request, IOException e) {
//                e.printStackTrace();
//            }
//
//            @Override
//            public void onResponse(Response response) throws IOException {
//                if (!response.isSuccessful()) throw new IOException("Unexpected code " + response);
//
//                Headers responseHeaders = response.headers();
//                for (int i = 0, size = responseHeaders.size(); i < size; i++) {
//                    Log.d(TAG, responseHeaders.name(i) + ": " + responseHeaders.value(i));
//                }
//
//                InputStream input = response.body().byteStream();
//
//                try {
//                    ByteArrayOutputStream bos = new ByteArrayOutputStream();
//                    byte[] buffer = new byte[1024];
//
//                    while (input.read(buffer) != -1) {
//                        bos.write(buffer);
//                    }
//                    byte[] docBuffer = bos.toByteArray();
//                    fileSize = bos.size();
//
//                } finally {
//                    input.close();
//                }
//
//                endTime = System.currentTimeMillis();
//
//
//                // calculate how long it took by subtracting endtime from starttime
//
//                double timeTakenMills = Math.floor(endTime - startTime);  // time taken in milliseconds
//                double timeTakenSecs = timeTakenMills / 1000;  // divide by 1000 to get time in seconds
//                final int kilobytePerSec = (int) Math.round(1024 / timeTakenInSecs);
//
//                if(kilobytePerSec <= POOR_BANDWIDTH){
//                    // slow connection
//                }
//
//                // get the download speed by dividing the file size by time taken to download
//                double speed = fileSize / timeTakenMills;
//
//                Log.d(TAG, "Time taken in secs: " + timeTakenSecs);
//                Log.d(TAG, "kilobyte per sec: " + kilobytePerSec);
//                Log.d(TAG, "Download Speed: " + speed);
//                Log.d(TAG, "File size: " + fileSize);
//
//
//            }
//        });
    }

}



```
