package br.com.elderlyframe.view.zoom.seekbar;

import android.view.MotionEvent;
import android.view.View;

class TranslationHandler implements View.OnTouchListener {

    private final View translateTarget;

    private float scale;

    private float startX = 0f;
    private float startY = 0f;
    private float dx = 0f;
    private float dy = 0f;
    private float prevDx = 0f;
    private float prevDy = 0f;

    public TranslationHandler(View translateTarget) {
        this.translateTarget = translateTarget;
        this.scale = 1.0f;
    }

    @Override
    public boolean onTouch(View view, MotionEvent motionEvent) {

        switch (motionEvent.getAction() & MotionEvent.ACTION_MASK) {

            case MotionEvent.ACTION_DOWN:
                startX = motionEvent.getX() - prevDx;
                startY = motionEvent.getY() - prevDy;
                break;

            case MotionEvent.ACTION_MOVE:
                dx = motionEvent.getX() - startX;
                dy = motionEvent.getY() - startY;
                break;

            case MotionEvent.ACTION_UP:
                prevDx = dx;
                prevDy = dy;
                break;
        }

        view.getParent().requestDisallowInterceptTouchEvent(true);

        float maxDx = (view.getWidth() - (view.getWidth() / scale)) / 2 * scale;
        float maxDy = (view.getHeight() - (view.getHeight() / scale)) / 2 * scale;
        dx = Math.min(Math.max(dx, -maxDx), maxDx);
        dy = Math.min(Math.max(dy, -maxDy), maxDy);

        translateTarget.setTranslationX(dx);
        translateTarget.setTranslationY(dy);

        return true;
    }

    public void updateScale(final float scale) {
        this.scale = scale;
    }
}