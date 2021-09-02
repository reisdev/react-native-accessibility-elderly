package br.com.elderlyframe.view.zoom.seekbar;

import android.content.Context;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import android.util.AttributeSet;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.SeekBar;

import static android.view.Gravity.BOTTOM;
import static android.widget.FrameLayout.LayoutParams.MATCH_PARENT;
import static android.widget.FrameLayout.LayoutParams.WRAP_CONTENT;

public class SeekBarZoomFrameLayout extends FrameLayout implements SeekBar.OnSeekBarChangeListener {

    private static final int MAX_SCALE = 3;

    private TranslationHandler translationHandler;
    private View content;
    private SeekBar seekBar;

    public SeekBarZoomFrameLayout(@NonNull Context context) {
        super(context);
        init(context);
    }

    public SeekBarZoomFrameLayout(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        init(context);
    }

    public SeekBarZoomFrameLayout(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context);
    }

    private void init(final Context context) {

        this.seekBar = new SeekBar(context);
        seekBar.setLayoutParams(new LayoutParams(MATCH_PARENT, WRAP_CONTENT, BOTTOM));
        seekBar.setMax(MAX_SCALE * 10);

        seekBar.setOnSeekBarChangeListener(this);
    }

    @Override
    protected void onFinishInflate() {

        super.onFinishInflate();

        this.content = getChildAt(0);

        this.addView(seekBar);

        translationHandler = new TranslationHandler(this.content);
        this.setOnTouchListener(translationHandler);
    }

    @Override
    public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {

        final float newScale = progress / 10f + 1;

        content.setScaleX(newScale);
        content.setScaleY(newScale);

        translationHandler.updateScale(newScale);
    }

    @Override
    public void addView(final View view) {

        if (getChildCount() > 1) {
            throw new IllegalStateException("SeekBarFrameLayout can host only one direct child!");
        }

        super.addView(view);
    }

    @Override
    public void onStartTrackingTouch(SeekBar seekBar) {
    }

    @Override
    public void onStopTrackingTouch(SeekBar seekBar) {
    }
}