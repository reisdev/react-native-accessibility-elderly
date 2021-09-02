package com.elderlyframe;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.text.TextUtils;
import android.util.Log;
import android.widget.EditText;

import java.util.ArrayList;
import java.util.Locale;

class SpeechToText implements RecognitionListener {

    private SpeechRecognizer speech;
    private Handler handler;
    private Intent recognizerIntent;
    private EditText editText;
    private String text = "";
    private boolean isListening = false;
    private int MINIMUM_LENGTH_FOR_EXTRA_SPEECH_IN_MILLIS = 3000;
    final BackgroundVoiceListener backgroundVoiceListener;

    public boolean isListening() {
        return isListening;
    }

    public void setListening(boolean listening) {
        isListening = listening;
    }

    public SpeechToText(Context context, EditText editText) {
        this.editText = editText;
        handler = new Handler(context.getMainLooper());
        backgroundVoiceListener = new BackgroundVoiceListener();
        speech = SpeechRecognizer.createSpeechRecognizer(context);
        speech.setRecognitionListener(this);
        recognizerIntent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        recognizerIntent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_PREFERENCE, Locale.getDefault());
        recognizerIntent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_WEB_SEARCH);
        recognizerIntent.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true);
        recognizerIntent.putExtra(RecognizerIntent.EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS,
                MINIMUM_LENGTH_FOR_EXTRA_SPEECH_IN_MILLIS);
    }

    @Override
    public void onReadyForSpeech(Bundle bundle) {
        Log.d("Speech", "Ready to listen");
        setListening(false);
    }

    @Override
    public void onBeginningOfSpeech() {
        setListening(true);
    }

    @Override
    public void onRmsChanged(float v) {
    }

    @Override
    public void onBufferReceived(byte[] bytes) {
    }

    @Override
    public void onEndOfSpeech() {
        setListening(false);
    }

    @Override
    public void onError(int i) {
    }

    @Override
    public void onResults(Bundle results) {
        ArrayList<String> matches = results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);

        if (matches != null) {
            text = TextUtils.join(" ", matches);
            editText.setText(text);
        }
        setListening(false);
    }

    @Override
    public void onPartialResults(Bundle partialResults) {
        ArrayList<String> matches = partialResults.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);

        if (matches != null) {
            text = TextUtils.join(" ", matches);
            editText.setText(text);
        }
        setListening(false);
    }

    @Override
    public void onEvent(int i, Bundle bundle) {
    }

    private Runnable startListening = new Runnable() {
        @Override
        public void run() {
            Log.i("Text", "Started Listening");
            setListening(true);
            speech.startListening(recognizerIntent);
        }
    };

    private Runnable stopListening = new Runnable() {
        @Override
        public void run() {
            Log.i("Text", "Stopped Listening");
            setListening(false);
            speech.stopListening();
        }
    };

    public class BackgroundVoiceListener extends Thread {
        public void run() {
            try {
                sleep(10);
                Log.i("Text", "islistening: " + isListening());
                if (!isListening()) {
                    // To run on main thread
                    handler.post(startListening);
                } else {
                    handler.post(stopListening);
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

}