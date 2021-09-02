package com.elderlyframe;

import android.Manifest;
import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.content.res.Resources;
import android.content.res.TypedArray;
import androidx.annotation.Nullable;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import android.util.AttributeSet;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.elderlyframe.R;

public class SpeechText extends LinearLayout {

    private static final float ICON_WEIGHT = 0.15f;
    private static final float EDIT_TEXT_WEIGHT = 0.85f;

    private SpeechToText stt;

    private Integer iconResource;
    private String hint;
    private Integer ems;

    private EditText editText;
    private ImageButton button;

    public SpeechText(Context context) {
        super(context);
        init(context);
    }

    public SpeechText(Context context, @Nullable AttributeSet attrs) {
        super(context, attrs, 0);
        this.parseAttributes(context, attrs);
        init(context);

    }

    public SpeechText(Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        this.parseAttributes(context, attrs);
        init(context);
    }

    private void init(Context context) {

        this.setOrientation(LinearLayout.HORIZONTAL);

        this.createEditText(context);

        this.stt = new SpeechToText(context, editText);

        this.createButton(context);

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (ContextCompat.checkSelfPermission(getContext(),
                        Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {

                    if (ActivityCompat.shouldShowRequestPermissionRationale((Activity) getContext(),
                            Manifest.permission.RECORD_AUDIO)) {
                        ActivityCompat.requestPermissions((Activity) getContext(),
                                new String[] { Manifest.permission.RECORD_AUDIO }, 0);
                    }
                }

                if (ContextCompat.checkSelfPermission(getContext(),
                        Manifest.permission.RECORD_AUDIO) == PackageManager.PERMISSION_GRANTED) {
                    stt.backgroundVoiceListener.start();
                }
            }
        });

        this.addView(button);
        this.addView(editText);
    }

    private void createButton(Context context) {
        button = new ImageButton(context);
        button.setLayoutParams(new LayoutParams(0, LayoutParams.MATCH_PARENT, ICON_WEIGHT));
        button.setImageResource(iconResource);
        button.setBackgroundResource(0);
        button.setScaleType(ImageView.ScaleType.FIT_CENTER);
    }

    private void createEditText(Context context) {
        this.editText = new EditText(context);
        editText.setLayoutParams(new LayoutParams(0, LayoutParams.MATCH_PARENT, EDIT_TEXT_WEIGHT));
        editText.setHint(this.hint);
        editText.setEms(this.ems);
    }

    private void parseAttributes(Context context, AttributeSet attrs) {
        if (attrs == null) {
            return;
        }

        TypedArray a = context.getTheme().obtainStyledAttributes(attrs, R.styleable.SpeechText, 0, 0);
        iconResource = a.getResourceId(R.styleable.SpeechText_iconSrc, 0);
        hint = a.getString(R.styleable.SpeechText_hint);
        ems = a.getInteger(R.styleable.SpeechText_ems, 0);
    }

    public EditText getEditText() {
        return editText;
    }

    public ImageButton getButton() {
        return button;
    }
}
