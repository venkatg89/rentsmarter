package com.RentSmarter; // was com.RentSmarter
import com.facebook.react.ReactActivity;
import com.google.android.gms.security.ProviderInstaller;

import org.devio.rn.splashscreen.SplashScreen;

import android.content.Intent;
import android.os.Bundle;


public class MainActivity extends  ReactActivity
implements ProviderInstaller.ProviderInstallListener {

  private static final int ERROR_DIALOG_REQUEST_CODE = 1;

  private boolean retryProviderInstall;

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "RentSmarter";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    //SplashScreen.show(this);
    super.onCreate(null);
    ProviderInstaller.installIfNeededAsync(this, this);
  }


  /**
   * This method is only called if the provider is successfully updated
   * (or is already up-to-date).
   */
  @Override
  public void onProviderInstalled() {
    // Provider is up-to-date, app can make secure network calls.
  }

  /**
   * This method is called if updating fails; the error code indicates
   * whether the error is recoverable.
   */
  @Override
  public void onProviderInstallFailed(int errorCode, Intent recoveryIntent) {
//    GoogleApiAvailability availability = GoogleApiAvailability.getInstance();
//    if (availability.isUserRecoverableError(errorCode)) {
//      // Recoverable error. Show a dialog prompting the user to
//      // install/update/enable Google Play services.
//      availability.showErrorDialogFragment(
//              this,
//              errorCode,
//              ERROR_DIALOG_REQUEST_CODE,
//              new DialogInterface.OnCancelListener() {
//                @Override
//                public void onCancel(DialogInterface dialog) {
//                  // The user chose not to take the recovery action
//                  onProviderInstallerNotAvailable();
//                }
//              });
//    } else {
//      // Google Play services is not available.
//      onProviderInstallerNotAvailable();
//    }
  }

  @Override
  public void onActivityResult(int requestCode, int resultCode,
                               Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    if (requestCode == ERROR_DIALOG_REQUEST_CODE) {
      // Adding a fragment via GoogleApiAvailability.showErrorDialogFragment
      // before the instance state is restored throws an error. So instead,
      // set a flag here, which will cause the fragment to delay until
      // onPostResume.
      retryProviderInstall = true;
    }
  }

  /**
   * On resume, check to see if we flagged that we need to reinstall the
   * provider.
   */
  @Override
  protected void onPostResume() {
    super.onPostResume();
    if (retryProviderInstall) {
      // We can now safely retry installation.
      ProviderInstaller.installIfNeededAsync(this, this);
    }
    retryProviderInstall = false;
  }

  private void onProviderInstallerNotAvailable() {
    // This is reached if the provider cannot be updated for some reason.
    // App should consider all HTTP communication to be vulnerable, and take
    // appropriate action.
  }
  
}
