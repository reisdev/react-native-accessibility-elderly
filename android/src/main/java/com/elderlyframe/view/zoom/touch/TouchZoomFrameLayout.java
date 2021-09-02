package br.com.elderlyframe.view.zoom.touch;

import android.content.Context;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import android.util.AttributeSet;
import android.view.MotionEvent;
import android.view.ScaleGestureDetector;
import android.widget.FrameLayout;

public class TouchZoomFrameLayout extends FrameLayout implements ScaleGestureDetector.OnScaleGestureListener {

    private static int amountTouch = 0;
    private static boolean isZoom = false;

    public TouchZoomFrameLayout(@NonNull Context context) {
        super(context);
        init();
    }

    public TouchZoomFrameLayout(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public TouchZoomFrameLayout(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init();
    }

    @Override
    public boolean onScale(ScaleGestureDetector detector) {
        return false;
    }

    @Override
    public boolean onScaleBegin(ScaleGestureDetector detector) {
        return false;
    }

    @Override
    public void onScaleEnd(ScaleGestureDetector detector) {

    }

    public boolean onTouchEvent(MotionEvent e) {


        if (MotionEvent.ACTION_DOWN == e.getAction()) {
            if (!isZoom ) {
                amountTouch++;
            }

            new Thread(new Runnable() {
                public void run() {
                    try {
                        Thread.sleep(800);
                        amountTouch = 0;
                    } catch (InterruptedException e1) {
                        e1.printStackTrace();
                    }
                }
            }).start();

            if (isDoubleClick()) {
                amountTouch = 0;
                isZoom = true;
                getParent().requestDisallowInterceptTouchEvent(true);

                setScaleX(2L);
                setScaleY(2L);

                setPivotY(e.getY());
                setPivotX(e.getX());

            } else {
                isZoom = false;
                setScaleY(1);
                setScaleX(1);
            }
        }
        return true;
    }

    public void init() {

    }

    private boolean isDoubleClick() {
        return amountTouch == 2;
    }


}
